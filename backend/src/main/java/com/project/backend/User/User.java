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
//    @Column(name="id", nullable = false) private Long id;
//    @Column(name="username", nullable = false) private String username;
//    @Column(name="firstname", nullable = false) private String firstName;
//    @Column(name="lastname", nullable = false) private String lastName;
//    @Column(name="email", nullable = false) private String email;
//    @Column(name="password", nullable = false) private String password;
//    @Column(name="phone", nullable = false) private Long phone;
//    @Column(name="address", nullable = false) private String address;
//    @Column(name="geographical_location", nullable = false) private String geographical_location;
//    @Column(name="tax_identification_number", nullable = false) private Long tax_Identification_Number;
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

    public User(Long id, String username, String firstName, String lastName, String email, String password, Long phone, String address, String geographical_location, Long tax_Identification_Number, Collection<Role> roles) {
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
        this.roles =  new ArrayList<>();
    }
}
