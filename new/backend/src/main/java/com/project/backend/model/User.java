package com.project.backend.model;

import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data @Getter @Setter @Entity @NoArgsConstructor
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "username")})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Long phone;
    private String address;
    private String geographical_location;
    private Long tax_Identification_Number;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(  name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
//    @Transient
    private boolean admin_accepted; // flag to check if the admin accepted the sign up request

    //custom constructor implementation (roles not initialized yet when user object created)
    public User(String username, String firstName, String lastName, String email, String password, Long phone, String address, String geographical_location, Long tax_Identification_Number) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.geographical_location = geographical_location;
        this.tax_Identification_Number = tax_Identification_Number;
        this.admin_accepted = false;
    }
}