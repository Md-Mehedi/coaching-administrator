package coaching.administrator.classes.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Security.PasswordEncoder;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;

    public Admin saveAdmin(Admin admin) {
        PasswordEncoder pEncoder = new PasswordEncoder();
        admin.setPassword(pEncoder.getEncodedPassword(admin.getPassword()));
        return repository.save(admin);
    }

    public Admin getAdminById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Admin getAdminByFullName(String name) {
        return repository.findByFullName(name);
    }

    public Admin getAdminByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String deleteAdmin(Integer id) {

        repository.deleteById(id);
        return "Admin with id : " + id + " deleted";
    }

    public Admin updateAdmin(Admin admin) {
        Admin oldAdmin = repository.findById(admin.getId()).orElse(null);
        PasswordEncoder pEncoder = new PasswordEncoder();

        oldAdmin.setPassword(pEncoder.getEncodedPassword(admin.getPassword()));
        oldAdmin.setFullName(admin.getFullName());
        oldAdmin.setNickName(admin.getNickName());
        oldAdmin.setGender(admin.getGender());
        oldAdmin.setEmail(admin.getEmail());
        oldAdmin.setFatherName(admin.getFatherName());
        oldAdmin.setMotherName(admin.getMotherName());
        oldAdmin.setDateOfBirth(admin.getDateOfBirth());
        oldAdmin.setBloodGroup(admin.getBloodGroup());
        oldAdmin.setNationality(admin.getNationality());
        oldAdmin.setJoiningDate(admin.getJoiningDate());
        oldAdmin.setPermanentAdrsId(admin.getPermanentAdrsId());
        oldAdmin.setPresentAdrsId(admin.getPresentAdrsId());
        oldAdmin.setFatherOcptnId(admin.getFatherOcptnId());
        oldAdmin.setMotherOcptnId(admin.getMotherOcptnId());
        oldAdmin.setReligionId(admin.getReligionId());
        oldAdmin.setPersonType(admin.getPersonType());
        oldAdmin.setImage(admin.getImage());
        oldAdmin.setActivated(admin.getActivated());

        return repository.save(oldAdmin);
    }

}