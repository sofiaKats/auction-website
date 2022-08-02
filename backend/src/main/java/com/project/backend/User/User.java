package com.project.backend.User;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@NoArgsConstructor
//@EqualsAndHashCode
@Entity
@Data
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = false) private Long id;
    @Column(name="username", nullable = false) private String username;
    @Column(name="firstname", nullable = false) private String firstName;
    @Column(name="lastname", nullable = false) private String lastName;
    @Column(name="email", nullable = false) private String email;
    @Column(name="password", nullable = false) private String password;
    @Column(name="phone", nullable = false) private Long phone;
    @Column(name="address", nullable = false) private String address;
    @Column(name="geographical_location", nullable = false) private String geographical_location;
    @Column(name="tax_identification_number", nullable = false) private Long tax_Identification_Number;
    @Enumerated(EnumType.STRING)
    @Column(name="user_role", nullable = false) private UserRole userRole;  // User or Admin
    private Boolean locked = false;

    public User(String username, String firstName, String lastName, String email, String password, Long phone, String address, String geographical_location, Long tax_Identification_Number, UserRole userRole) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.geographical_location = geographical_location;
        this.tax_Identification_Number = tax_Identification_Number;
        this.userRole = userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
