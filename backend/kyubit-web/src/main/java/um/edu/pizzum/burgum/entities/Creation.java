package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "creations")
public class Creation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column
    private String productType; //Esto es si es hamburgues o pizza o otra cosa en el futuro


    //N:N para Ingredients
    @ManyToMany
    @JoinTable(
            name = "creation_ingredient", // Nombre de la tabla de unión (intermedia)
            joinColumns = @JoinColumn(name = "creation_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> ingredients = new HashSet<>();

    // opcional: lista de OrderItem que incluyen esta creation (no requerida), no se yo la dejo igual
    @OneToMany(mappedBy = "creation")
    private List<OrderItem> orderItems = new ArrayList<>();
}
