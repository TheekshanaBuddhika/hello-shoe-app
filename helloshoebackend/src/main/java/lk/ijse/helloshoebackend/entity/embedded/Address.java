package lk.ijse.helloshoebackend.entity.embedded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Address implements Serializable {
    private String lane;
    private String mainCountry;
    private String mainCity;
    private String mainState;
    private String postalCode;
}