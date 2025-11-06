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
import java.util.*;

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



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Devuelve el rol en el formato que Spring Security necesita
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Token> tokens;

    //Desde aca empeze a agregar---------------------------------------------------------------------------

    @ManyToMany
    @JoinTable(
            name = "user_favorite_creations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "creation_id")
    )
    private Set<Creation> favoriteCreations = new HashSet<>();


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true) // <--- ¡CORRECCIÓN!
    private List<Address> addresses = new ArrayList<>();


    // Relación OneToMany: Un usuario (Admin) puede subir muchas Creations
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Creation> createdProducts = new ArrayList<>();



    // Nueva relación: un usuario puede tener varios PaymentMethod
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<PaymentMethod> paymentMethods = new ArrayList<>();

    // Helpers para mantener ambas caras de la relación sincronizadas
    public void addPaymentMethod(PaymentMethod pm) {
        if (pm == null) return;
        paymentMethods.add(pm);
        pm.setUser(this);
    }

    public void removePaymentMethod(PaymentMethod pm) {
        if (pm == null) return;
        paymentMethods.remove(pm);
        pm.setUser(null);
    }

    //Hasta aca---------------------------------------------------------------------------------------------------



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



