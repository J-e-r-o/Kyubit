//------------> Añadi un bean que cree un admin si no existe <-----------------------------

package um.edu.pizzum.burgum.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.repository.UserRepository;

@Configuration
public class SeedConfig {

    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            String adminEmail = "admin@local";
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User u = User.builder()
                        .name("Admin")
                        .lastname("Root")
                        .email(adminEmail)
                        .password(encoder.encode("admin123"))
                        .role(User.Role.ROLE_ADMIN)
                        .build();
                userRepository.save(u);
                System.out.println("Admin creado: " + adminEmail + " / admin123");
            }
        };
    }
}
