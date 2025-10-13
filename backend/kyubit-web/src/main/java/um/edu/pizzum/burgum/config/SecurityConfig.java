package um.edu.pizzum.burgum.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())

                // --- ¡NUEVA REGLA PARA H2! ---
                // Desactivamos la protección de cabeceras para los frames,
                // que es necesaria para que la consola H2 funcione.
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.disable())
                )

                .authorizeHttpRequests(auth -> auth
                        // Permitimos el acceso público al registro/login
                        .requestMatchers("/api/auth/**").permitAll()

                        // --- ¡NUEVA REGLA PARA H2! ---
                        // Permitimos el acceso público a la consola H2 y todo lo que hay dentro.
                        .requestMatchers("/h2-console/**").permitAll()

                        // Para cualquier otra petición, requerimos autenticación
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authenticationProvider(authenticationProvider);

        return http.build();
    }
}

