package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private User user; // La creación pertenece a un usuario

    @Column(nullable = false)
    private String name; // El nombre que el cliente le da a su creación

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "creation_ingredients", // Nombre de la tabla intermedia
            joinColumns = @JoinColumn(name = "creation_id"), // Columna que apunta a esta entidad (Creation)
            inverseJoinColumns = @JoinColumn(name = "product_id") // Columna que apunta a la otra entidad (Products)
    )
    private List<Products> ingredients; // La lista ahora sabe que contiene objetos de tipo 'Products'

}
