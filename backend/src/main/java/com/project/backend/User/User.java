package com.project.backend.User;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false) private Long id;
    @Column(nullable = false) private String username;
    @Column(nullable = false) private String firstName;
    @Column(nullable = false) private String lastName;
    @Column(nullable = false) private String email;
    @Column(nullable = false) private String password;
    @Column(nullable = false) private Long phone;
    @Column(nullable = false) private String address;
    @Column(nullable = false) private String geographical_location;
    @Column(nullable = false) private Long tax_Identification_Number;
    @Column(nullable = false) private String userCode;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false) private UserRole userRole;  // User or Admin
    private Boolean locked = false;
    private Boolean enabled = false;

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
        return enabled;
    }
}
