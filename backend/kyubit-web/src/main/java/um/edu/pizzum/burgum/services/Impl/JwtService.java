package um.edu.pizzum.burgum.services.Impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final long jwtExpiration = 1000 * 60 * 24; // 24 horas

    // Usamos inyección por constructor para la clave, es más limpio
    public JwtService(@Value("${application.security.jwt.secret-key}") String secretKeyValue) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKeyValue);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    // --- MÉTODOS PARA CREAR TOKENS ---

    public String getToken(UserDetails user) {
        return getToken(new HashMap<>(), user);
    }

    private String getToken(Map<String, Object> extraClaims, UserDetails user) {
        // --- SINTAXIS MODERNA PARA CONSTRUIR ---
        return Jwts.builder()
                .claims(extraClaims)
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }

    // --- MÉTODOS PARA LEER Y VALIDAR TOKENS ---

    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    public <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaims(String token) {
        // --- SINTAXIS MODERNA PARA PARSEAR ---
        return Jwts.parser() // El método moderno es 'parser'
                .verifyWith(secretKey) // Se usa 'verifyWith' para establecer la clave
                .build()
                .parseSignedClaims(token) // Se usa 'parseSignedClaims'
                .getPayload(); // Se usa 'getPayload' en lugar de 'getBody'
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return getExpirationDate(token).before(new Date());
    }

    private Date getExpirationDate(String token) {
        return getClaim(token, Claims::getExpiration);
    }
}

