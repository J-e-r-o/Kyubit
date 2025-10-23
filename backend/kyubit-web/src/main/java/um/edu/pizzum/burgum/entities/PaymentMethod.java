package um.edu.pizzum.burgum.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "paymentMethods")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class PaymentMethod{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cardType;

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false, length = 4)
    private String lastFourDigits;

    @Column(nullable = false)
    private String expirationDate;

    @Column(nullable = false)
    private String token; // Me recomendaron este campo para manejar los token de pagos, lo dejo y sino despues lo borramos

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}




