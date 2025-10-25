package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ingredients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false)
    private Integer cost;

    @Column(nullable = false)
    private Integer stock;


    @ManyToMany(mappedBy = "ingredients")
    private Set<Creation> creations = new HashSet<>();
}
