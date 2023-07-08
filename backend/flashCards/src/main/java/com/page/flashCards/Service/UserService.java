package com.page.flashCards.Service;

import com.page.flashCards.Config.Security.JwtService;
import com.page.flashCards.Dto.AuthResponse;
import com.page.flashCards.Dto.UserLoginDto;
import com.page.flashCards.Entity.Role;
import com.page.flashCards.Entity.User;
import com.page.flashCards.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthResponse register(User user){
        User tmpUser = user;
        tmpUser.setPassword(passwordEncoder.encode(user.getPassword()));
        tmpUser.setRole(Role.USER);
        userRepo.save(tmpUser);
        String jwtToken = jwtService.generateToken(tmpUser);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse login(UserLoginDto user) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getLogin(),
                        user.getPassword()
                )
        );
        User tmpUser = userRepo.findByLogin(user.getLogin()).orElseThrow();
        String jwtToken = jwtService.generateToken(tmpUser);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User findByName(String username) {
        Optional<User> user = userRepo.findByLogin(username);
        if (user.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user of this username");
        return user.get();
    }

    public User findById(Integer id) {
        Optional<User> user = userRepo.findById(id);
        if (user.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user of this id");
        return user.get();
    }
}
