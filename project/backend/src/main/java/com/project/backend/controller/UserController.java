package com.project.backend.controller;


import com.project.backend.Repo.UserRepository;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //return all users
    @GetMapping("/users/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/users/admin-acceptance/{id}")
    public ResponseEntity<User> UserAcceptance(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
        user.setAdmin_accepted(true); //user is now accepted by admin

        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    //return all users
    @GetMapping("/users/custom/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<User>> getAllUsersCustom() {
//        List<User> users = userRepository.findAll();
//        List<User> customUsers = new ArrayList<User>();
//        //iterate through all users in database and list
//        // all users that the admin hasn't accepted yet
//        // on admin page
//        for (int i = 0; i < users.size(); i++) {
//            if (!users.get(i).isAdmin_accepted()) { //false: admin hasn't accepted sign up request yet
////                System.out.println("User with username: " + users.get(i).getUsername() +
////                        " has flag: " + users.get(i).isAdmin_accepted());
//                customUsers.add(users.get(i));
//            }
//        }
        List<User> inactiveUsers = userRepository.findAllInactiveUsers();
        return new ResponseEntity<>(inactiveUsers, HttpStatus.OK);
    }

    // get user by id rest api
    @GetMapping("/users/find/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // get user by id and check if user is validated @ frontend
//    @RequestMapping("/users/findValidatedUser/{username}")
//    @ResponseBody
//    public Map<String, Boolean> getValidatedUserById(@PathVariable String Username) {
//        Optional<User> user = userRepository.findByUsername(Username);
//        if (!user.isAdmin_accepted()) //user not accepted yet by admin
//            return Collections.singletonMap("accepted", false);
//
//        //else the user is already accepted by admin
//        return Collections.singletonMap("accepted", true);
//    }

    // delete user
    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
