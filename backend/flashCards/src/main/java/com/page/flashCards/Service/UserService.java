package com.page.flashCards.Service;

import com.page.flashCards.Entity.User;
import com.page.flashCards.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
