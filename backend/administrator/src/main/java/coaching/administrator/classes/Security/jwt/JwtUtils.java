package coaching.administrator.classes.Security.jwt;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${coachingadministrator.app.jwtSecret}")
  private String jwtSecret;

  @Value("${coachingadministrator.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(String email) {

    // UserDetailsImpl userPrincipal = (UserDetailsImpl)
    // authentication.getPrincipal();
    // List<GrantedAuthority> grantedAuthorities = AuthorityUtils
    // .commaSeparatedStringToAuthorityList("ROLE_ADMIN");
    String token = Jwts.builder()
        .setSubject(email)
        .claim("authorities", "ROLE_ADMIN")
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
        .signWith(SignatureAlgorithm.HS256, jwtSecret)
        .compact();

    System.out.println("User token after sign in :");
    System.out.println("Bearer " + token);
    return token;
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }

  public static UserDetails getUser() {
    return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }
}