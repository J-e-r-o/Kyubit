package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder // <--- ESENCIAL: Genera el método .builder()
@NoArgsConstructor // <--- ESENCIAL: Para que Jackson (JSON) pueda crear el objeto vacío
@AllArgsConstructor // <--- ESENCIAL: El Builder necesita un constructor con todos los argumentos
public class CreationDto {

    private Long id;
    private Long userId;
    private String name;
    private String productType; // "PIZZA" o "BURGER"

    // --- Campos Base (Compartidos o Pizza) ---
    private String size;
    private String crust; // Se usa para Masa (Pizza) y Pan (Burger)
    private String sauce;
    private String cheese;

    // --- Campos Nuevos para Hamburguesa ---
    private Integer meatCount;
    private String meatType;

    // --- Lista de IDs de Ingredientes ---
    private Set<Long> ingredientIds;

    private String alias;      // <--- NUEVO
    private Boolean isFavorite; // <--- NUEVO
}