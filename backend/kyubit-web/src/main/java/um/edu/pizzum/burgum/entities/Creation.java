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

    private String name; // Ej: "Mega Burger"
    private String productType; // "PIZZA" o "BURGER"

    // --- CAMPOS COMPARTIDOS O DE PIZZA ---
    private String size;   // Individual, Mediana...
    private String crust;  // Masa / Pan
    private String sauce;  // Salsa (Pizza) o Aderezo base (Burger)
    private String cheese;

    // --- CAMPOS NUEVOS PARA HAMBURGUESA ---
    private Integer meatCount; // Cantidad de carnes (Max 3)
    private String meatType;   // Vaca, Pollo, Lentejas...

    // Toppings (Sirve para ambos: Aceitunas en pizza / Bacon en burger)
    @ManyToMany
    @JoinTable(
            name = "creation_ingredients",
            joinColumns = @JoinColumn(name = "creation_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> ingredients = new HashSet<>();
}