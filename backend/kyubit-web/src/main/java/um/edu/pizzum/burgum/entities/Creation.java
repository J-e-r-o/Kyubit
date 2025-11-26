package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "creations")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Creation {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String name;
    private String productType;
    private String alias; // Nombre que le da el usuario


    private String size;
    private String crust;
    private String sauce;
    private String cheese;


    private Integer meatCount;
    private String meatType;

    // Toppings (Sirve para ambos: Aceitunas en pizza / Bacon en burger)
    @ManyToMany
    @JoinTable(
            name = "creation_ingredients",
            joinColumns = @JoinColumn(name = "creation_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> ingredients = new HashSet<>();

    @Column(name = "is_favorite")
    private Boolean isFavorite = false;
}