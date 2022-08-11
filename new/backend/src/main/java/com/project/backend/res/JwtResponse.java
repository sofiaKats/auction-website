package com.project.backend.res;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class JwtResponse {
    private String AccessToken;
    private String TokenType = "Bearer";
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
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String firstName, String lastName, String email, String password, Long phone, String address, String geographical_location, Long tax_Identification_Number, List<String> roles) {
        AccessToken = accessToken;
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
        this.roles = roles;
    }
}
