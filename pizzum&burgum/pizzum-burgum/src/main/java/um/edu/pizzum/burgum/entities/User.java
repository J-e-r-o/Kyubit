package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User  implements UserDetails {

    //con esto vamos a buscar las cosas en la bd al user
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column private Long userId;


    @Column (nullable = false, unique = true)
    private String email ;
    @Column (nullable = false)
    private String name;
    @Column (nullable = false)
    private String lastname;
    @Column (nullable = false)
    private String password;
    @Column (nullable = false)
    private LocalDate birthdate;

    @Enumerated(EnumType.STRING)
    @Column (nullable = false)
    private Role role;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return this.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}



enum Role {
    ROLE_ADMIN,
    ROLE_CLIENTE
}