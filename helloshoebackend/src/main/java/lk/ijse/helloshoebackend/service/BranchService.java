package lk.ijse.helloshoebackend.service;

import lk.ijse.helloshoebackend.dto.BranchDTO;
import lk.ijse.helloshoebackend.entity.Branch;

import java.util.List;

public interface BranchService {
    boolean saveBranch(BranchDTO branchDTO);

    List<BranchDTO> getAllBranches();

    boolean updateBranch(BranchDTO branchDTO);

    boolean deleteBranch(String branchId);

    List<String> getBranchIds();

    Branch getBranchById(String branchId);
}
