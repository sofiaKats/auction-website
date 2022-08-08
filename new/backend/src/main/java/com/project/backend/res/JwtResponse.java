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
    private String Email;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles) {
        AccessToken = accessToken;
        this.id = id;
        this.username = username;
        Email = email;
        this.roles = roles;
    }
}
