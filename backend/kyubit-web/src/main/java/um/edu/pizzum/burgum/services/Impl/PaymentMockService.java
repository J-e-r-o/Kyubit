package um.edu.pizzum.burgum.services.Impl;

import org.springframework.stereotype.Service;
import um.edu.pizzum.burgum.entities.PaymentMethod;

import java.util.Random;

@Service
public class PaymentMockService {

    private final Random random = new Random();

    public void processPayment(PaymentMethod paymentMethod, double amount) {

        if (paymentMethod.getLastFourDigits().equals("0000")) {
            throw new RuntimeException("Fondos insuficientes (Simulación)");
        }

        int chance = random.nextInt(10) + 1;
        if (chance <= 2) {
            throw new RuntimeException("Error de conexión con el banco (Simulación)");
        }

        
        System.out.println("Pago procesado exitosamente por $" + amount);
    }
}