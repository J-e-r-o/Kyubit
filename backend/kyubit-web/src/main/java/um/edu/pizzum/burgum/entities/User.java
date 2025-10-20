package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false, unique = true)
    private String email; // El email es único, pero no es la clave pk

    @Column(nullable = false)
    private String password;

    private LocalDate birthdate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany
    private List<Address> addresses;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Devuelve el rol en el formato que Spring Security necesita
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Token> tokens;




    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        // Usamos el email como identificador para el login
        return this.email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public enum Role {
        ROLE_ADMIN,
        ROLE_CLIENTE
    }




}


