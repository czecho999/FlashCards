package com.page.flashCards.Controller;

import com.page.flashCards.Dto.UserDto;
import com.page.flashCards.Entity.User;
import com.page.flashCards.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/user")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @PostMapping
    public User addNew(@RequestBody UserDto user){
        return userService.add(convertToEntity(user));
    }

    private User convertToEntity(UserDto userDto){
        User user= modelMapper.map(userDto, User.class);
        return user;
    }
}
