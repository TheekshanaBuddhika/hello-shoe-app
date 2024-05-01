package lk.ijse.helloshoebackend.util;

import org.springframework.stereotype.Service;

@Service
public class IdService {
    public static String generateID(Constants constants) {
        return switch (constants) {
            case USER_ID -> "USR-" + System.currentTimeMillis();
            case SUPPLIER_ID -> "SUP-" + System.currentTimeMillis();
            default -> "EMP-" + System.currentTimeMillis();
        };
    }
}
