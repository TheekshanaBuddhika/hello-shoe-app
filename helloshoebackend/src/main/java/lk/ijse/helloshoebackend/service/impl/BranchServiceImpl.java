package lk.ijse.helloshoebackend.service.impl;

import lk.ijse.helloshoebackend.dto.BranchDTO;
import lk.ijse.helloshoebackend.entity.Branch;
import lk.ijse.helloshoebackend.repository.BranchRepo;
import lk.ijse.helloshoebackend.service.BranchService;
import lk.ijse.helloshoebackend.util.IDGenerator;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchServiceImpl implements BranchService {

    private final BranchRepo branchRepo;

    private final ModelMapper mapper;

    public BranchServiceImpl(BranchRepo branchRepo, ModelMapper mapper) {
        this.branchRepo = branchRepo;
        this.mapper = mapper;
    }

    @Override
    public boolean saveBranch(BranchDTO branchDTO) {
        branchDTO.setBranchId(IDGenerator.generateBranchId());
        Branch save = branchRepo.save(mapper.map(branchDTO, Branch.class));
        return save != null;
    }

    @Override
    public List<BranchDTO> getAllBranches() {
        return branchRepo.findAll().stream().map(branch -> mapper.map(branch, BranchDTO.class)).toList();
    }

    @Override
    public boolean updateBranch(BranchDTO branchDTO) {
        Branch branch = branchRepo.findById(branchDTO.getBranchId()).orElse(null);
        if (branch != null) {
            branch.setBranchName(branchDTO.getBranchName());
            branch.setBranchContact(branchDTO.getBranchContact());
            branch.setAddress(branchDTO.getAddress());
//            branch.setNoOfEmployees(branchDTO.getNoOfEmployees());
//            branch.setBranchManager(branchDTO.getBranchManager());
            Branch save = branchRepo.save(branch);
            return save != null;
        }
        return false;
    }

    @Override
    public boolean deleteBranch(String branchId) {
        branchRepo.deleteById(branchId);
        return true;
    }

    @Override
    public List<String> getBranchIds() {
        return branchRepo.findAll().stream().map(Branch::getBranchId).toList();
    }

    @Override
    public Branch getBranchById(String branchId) {
        return branchRepo.findById(branchId).orElse(null);
    }
}
