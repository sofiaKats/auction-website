package com.project.backend.User;

import lombok.*;

import javax.persistence.*;
import javax.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.FetchType.EAGER;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Data
//@Table(name = "user")
public class User{
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
    @ManyToMany(fetch = EAGER)
    private Collection<Role> roles = new ArrayList<>();

    public User(Long id, String username, String firstName, String lastName, String email, String password, Long phone, String address, String geographical_location, Long tax_Identification_Number) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.geographical_location = geographical_location;
        this.tax_Identification_Number = tax_Identification_Number;
        UserService userService;
        this.roles =  new ArrayList<>();
    }
}
