package com.page.flashCards.Controller;

import com.page.flashCards.Dto.CreateUserDto;
import com.page.flashCards.Dto.UserDto;
import com.page.flashCards.Entity.User;
import com.page.flashCards.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/user")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @PostMapping
    public User addNew(@RequestBody CreateUserDto user){
        return userService.add(convertToEntity(user));
    }

    @GetMapping(path = "/{id}")
    public UserDto getById(@PathVariable("id") Integer id){
        return convertToDto(userService.findById(id));
    }

    private UserDto convertToDto(User user){
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }
    private User convertToEntity(CreateUserDto createUserDto){
        User user= modelMapper.map(createUserDto, User.class);
        return user;
    }
}
