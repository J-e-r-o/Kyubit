package um.edu.pizzum.burgum.services.Impl;

import org.springframework.stereotype.Service;
import um.edu.pizzum.burgum.entities.PaymentMethod;

import java.util.Random;

@Service
public class PaymentMockService {

    private final Random random = new Random();

    public void processPayment(PaymentMethod paymentMethod, double amount) {
        // ESTRATEGIA 1: Magic Number para pruebas deterministas
        // Si la tarjeta termina en "0000", fallamos intencionalmente.
        if (paymentMethod.getLastFourDigits().equals("0000")) {
            throw new RuntimeException("Fondos insuficientes (Simulación)");
        }

        // ESTRATEGIA 2: Aleatoriedad (Simular fallos de red o rechazos bancarios)
        // Generamos un número del 1 al 10. Si sale 1 o 2 (20%), fallamos.
        int chance = random.nextInt(10) + 1;
        if (chance <= 2) {
            throw new RuntimeException("Error de conexión con el banco (Simulación)");
        }

        // Si pasa, no hace nada (void), lo que significa "Éxito".
        System.out.println("Pago procesado exitosamente por $" + amount);
    }
}