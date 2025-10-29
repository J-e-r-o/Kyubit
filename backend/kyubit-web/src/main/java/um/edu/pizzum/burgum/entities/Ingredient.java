package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ingredients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false)
    private Integer cost; // si después quieres centavos, cambiar a BigDecimal

    @Column(nullable = false)
    private Integer stock;

    // colecciones excluidas de equals/hashCode y toString para evitar problemas con JPA
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "ingredients", fetch = FetchType.LAZY)
    private Set<Creation> creations = new HashSet<>();
}
