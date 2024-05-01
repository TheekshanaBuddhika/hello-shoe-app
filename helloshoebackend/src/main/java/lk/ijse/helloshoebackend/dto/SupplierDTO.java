package lk.ijse.helloshoebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SupplierDTO {
    private String id;
    private String name;
    private String category;
    private String email;
    private String mobileContact;
    private String landContact;
    private String line1;
    private String line2;
    private String line3;
    private String line4;
    private String line5;
    private String line6;
}
