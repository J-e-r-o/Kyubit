package um.edu.pizzum.burgum.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity // Añadido para permitir @PreAuthorize en los controllers
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    // ¡Esta es la inyección correcta del Bean creado en AppConfig!
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(withDefaults())
                .csrf(crsf -> crsf.disable())
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                .authorizeHttpRequests(auth -> auth
                        // 1. RUTAS PÚBLICAS
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/external/**")).permitAll()

                        // 2. RUTAS DE ADMIN (Backoffice) - Solo ROLE_ADMIN
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/**")).hasAuthority("ROLE_ADMIN")

                        // 3. RUTAS DE FUNCIONARIO/USUARIO (Acciones sensibles)
                        // Aquí podrías restringir DELETE a solo ADMIN si quisieras, o dejarlo a autenticados
                        .requestMatchers(new AntPathRequestMatcher("/api/orders/items/**", "DELETE")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("/api/ingredients/**", "DELETE")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/api/ingredients/**", "POST")).hasAuthority("ROLE_ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/api/ingredients/**", "PUT")).hasAuthority("ROLE_ADMIN")

                        // 4. RUTAS GENERALES AUTENTICADAS
                        // Esto cubre /api/users/**, /api/orders/** (GET/POST), etc.
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}

