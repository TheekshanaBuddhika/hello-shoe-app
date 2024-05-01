package lk.ijse.helloshoebackend.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class Address {
    @Column(length = 100)
    private String line1;

    @Column( length = 100)
    private String line2;

    @Column(length = 100)
    private String line3;

    @Column( length = 100)
    private String line4;

    @Column(length = 100)
    private String line5;

    @Column(length = 100)
    private String line6;

    public Address(String lane1, String lane2, String lane3, String lane4, String lane5) {
        this.line1 = lane1;
        this.line2 = lane2;
        this.line3 = lane3;
        this.line4 = lane4;
        this.line5 = lane5;
    }
}
