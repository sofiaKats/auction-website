package com.project.backend.Repo;

import com.project.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    //    Boolean existsByEmail(String email);

    @Query("SELECT record FROM User record WHERE record.username=?1")
    User getByUsername(String username);

    //iterate through all users in database and list
    // all users that the admin hasn't accepted yet on admin page
    @Query("SELECT record FROM User record WHERE record.admin_accepted=false")
    List<User> findAllInactiveUsers();
}