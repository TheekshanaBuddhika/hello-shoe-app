package lk.ijse.helloshoebackend.entity.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Embeddable
public class Contact {
    @Column(length = 20 , unique = true)
    private String mobile;
    @Column(length = 20 , unique = true)
    private String land;
}
