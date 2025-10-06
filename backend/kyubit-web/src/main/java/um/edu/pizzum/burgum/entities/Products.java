package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2) // Precision para BigDecimal
    private BigDecimal cost;

    @Enumerated(EnumType.STRING) // hice esto para el dominio, pero habria que agrandarlo
    @Column(nullable = false)
    private ProductType type;



    public enum ProductType {
        MASA,
        QUESO,
        TOPPING,
        CARNE_HAMB,
        ADEREZO,
        BEBIDA,
        ACOMPAÑAMIENTO
    }
}
