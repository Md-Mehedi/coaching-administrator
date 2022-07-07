package coaching.administrator.classes.Security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoder {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String getEncodedPassword(String rawPassword) {
        String encodedPassword = encoder.encode(rawPassword);
        return encodedPassword;
    }
}
