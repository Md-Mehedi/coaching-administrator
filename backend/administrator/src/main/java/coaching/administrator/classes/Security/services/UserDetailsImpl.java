package coaching.administrator.classes.Security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Person.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Integer id;
	private String email;
	@JsonIgnore
	private String password;
	private Integer coachingId;
	private Collection<? extends GrantedAuthority> authorities;

	public static UserDetailsImpl build(Person user) {
		Global.colorPrint("in userdetailsimpl build");
		GrantedAuthority authority = new SimpleGrantedAuthority(user.getPersonType());
		List<GrantedAuthority> authorities = List.of(authority);
		Integer coachingId = null;
		if (user.getCoaching() != null) {
			coachingId = user.getCoaching().getId();
		}
		return new UserDetailsImpl(
				user.getId(),
				user.getEmail(),
				user.getPassword(),
				coachingId,
				authorities);
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.getId());
	}

	@Override
	public String getUsername() {
		return id.toString();
	}
}