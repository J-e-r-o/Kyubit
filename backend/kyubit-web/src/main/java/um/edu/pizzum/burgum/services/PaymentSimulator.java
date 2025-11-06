package um.edu.pizzum.burgum.services;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class PaymentSimulator {

    private final Random rnd = new Random();

    /**
     * @return true ~90% de las veces, false ~10% de las veces
     */
    public boolean approve() {
        return rnd.nextInt(100) < 90;
    }
}
