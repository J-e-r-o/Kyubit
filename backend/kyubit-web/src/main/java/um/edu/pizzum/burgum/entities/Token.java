package um.edu.pizzum.burgum.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tokens")

public class Token {

    public enum TokenType {
        BEARER
    }

    @Id
    @GeneratedValue
    private Long id;

     @Column(unique = true)
    private String token;

     @Enumerated(EnumType.STRING)
    private TokenType tokenType = TokenType.BEARER;

     private boolean expired;
     private boolean revoked;

     @ManyToOne(fetch = FetchType.LAZY )
    @JoinColumn(name = "user_id",nullable = false)
    private User user;


}
