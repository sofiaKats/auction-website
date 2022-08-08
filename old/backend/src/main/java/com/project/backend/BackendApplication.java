package com.project.backend;

//import com.project.backend.User.Role;
//import com.project.backend.User.User;
//import com.project.backend.User.UserService;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//import java.util.ArrayList;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

//	@Bean
//	CommandLineRunner run(UserService userService) {
//		return args -> {
//			userService.saveRole(new Role(null, "ADMIN"));
//			userService.saveRole(new Role(null, "USER"));
//
//			userService.addUser(new User(null, "@ozzyosbourne", "Ozzy", "Osbourne", "ozzy@gmail.com", "123", 234567L, "1313 mockingbird lane", "greece",12476L, new ArrayList<>()));
//			userService.addUser(new User(null, "@robzombie", "Rob", "Zombie", "rob@gmail.com", "fg575g", 234567L, "1313 mockingbird lane", "greece",12476L, new ArrayList<>()));
//			userService.addUser(new User(null, "@litaford", "Lita", "Ford", "lita@gmail.com", "2fv56", 234567L, "1313 mockingbird lane", "greece",12476L, new ArrayList<>()));
//			userService.addUser(new User(null, "@joanjett", "Joan", "Jett", "joan@gmail.com", "666", 234567L, "1313 mockingbird lane", "greece",12476L, new ArrayList<>()));
//
//
//			userService.addRoleToUser("@ozzyosbourne", "ADMIN");
//			userService.addRoleToUser("@robzombie", "USER");
//			userService.addRoleToUser("@litaford", "USER");
//			userService.addRoleToUser("@joanjett", "USER");
//		};
//	}

}
