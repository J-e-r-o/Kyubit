package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreationDto {

    private Long id;
    private Long userId;
    private String name;
    private String productType;


    private String size;
    private String crust;
    private String sauce;
    private String cheese;


    private Integer meatCount;
    private String meatType;


    private Set<Long> ingredientIds;

    private String alias;
    private Boolean isFavorite;
}