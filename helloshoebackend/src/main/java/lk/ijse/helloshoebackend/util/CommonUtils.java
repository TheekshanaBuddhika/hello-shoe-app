package lk.ijse.helloshoebackend.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDate;
import java.util.Date;

public class CommonUtils {
    public static User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return  (User) authentication.getPrincipal();
    }

    public static LocalDate convertStringToDate(Date dob) {
        return dob.toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
    }

    public static Date convertDateToString(LocalDate dob) {
        return java.sql.Date.valueOf(dob);
    }

    public static Date getCurrentDate() {
        return new Date();
    }
}
