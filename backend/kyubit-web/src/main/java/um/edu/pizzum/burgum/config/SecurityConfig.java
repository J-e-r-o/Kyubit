package um.edu.pizzum.burgum.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
                .cors(withDefaults()) // Aplica el Bean de CORS de AppConfig
                .csrf(crsf -> crsf.disable())
                .headers(headers ->
                        headers.frameOptions(frame -> frame.disable()) // Permite la consola H2
                )
                .authorizeHttpRequests(authRequest ->
                        authRequest
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                .requestMatchers("/h2-console/**").permitAll() // Permite la consola H2
                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManager ->
                        sessionManager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))


                .authenticationProvider(authenticationProvider)

                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // --- ELIMINADO ---
    // Todos estos Beans ya están definidos en AppConfig.java
    // No necesitamos definirlos de nuevo aquí.

    // @Bean
    // public DaoAuthenticationProvider daoAuthenticationProvider() { ... }

    // @Bean
    // public PasswordEncoder passwordEncoder() { ... }

    // @Bean
    // public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { ... }
}

