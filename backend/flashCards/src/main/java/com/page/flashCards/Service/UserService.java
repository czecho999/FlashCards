package com.page.flashCards.Service;

import com.page.flashCards.Entity.User;
import com.page.flashCards.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepo userRepo;

    public User add(User user){
        return userRepo.save(user);
    }

    public User findByName(String username) {
        return userRepo.findByLogin(username);
    }

    public User findById(Integer id) {
        Optional<User> user = userRepo.findById(id);
        if (user.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user of this id");
        return user.get();
    }
}
