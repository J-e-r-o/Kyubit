package um.edu.pizzum.burgum.entities;

import jakarta.persistence.*;
import lombok.*; // Importa todo
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter // Usa Getter y Setter en lugar de @Data para tener control
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id")
    @ToString.Exclude         // <--- IMPORTANTE: Rompe el ciclo en logs
    @EqualsAndHashCode.Include// <--- IMPORTANTE: Rompe el ciclo en comparaciones
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "creation_id")
    private Creation creation;

    private Integer quantity;
    private BigDecimal unitPrice;
}