package lk.ijse.helloshoebackend.repository;

import lk.ijse.helloshoebackend.entity.Employee;
import lk.ijse.helloshoebackend.util.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, String> {
        List<Employee> findAllByRole(Role role);
}
