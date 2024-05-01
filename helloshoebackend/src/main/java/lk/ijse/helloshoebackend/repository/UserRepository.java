package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.EmployeeEntity;
import lk.ijse.helloshoebackend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, String> {

        Optional<UserEntity> findByEmail(String email);

        UserEntity findByEmployeeEntity(EmployeeEntity employeeEntity);

}
