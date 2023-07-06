package com.page.flashCards.Controller;

import com.page.flashCards.Dto.AuthResponse;
import com.page.flashCards.Dto.CreateUserDto;
import com.page.flashCards.Dto.UserDto;
import com.page.flashCards.Dto.UserLoginDto;
import com.page.flashCards.Entity.User;
import com.page.flashCards.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/user")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @PostMapping
    public AuthResponse register(@RequestBody CreateUserDto user){
        return userService.register(convertToEntity(user));
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody UserLoginDto user){
        return userService.login(user);
    }

    @GetMapping(path = "/{id}")
    public UserDto getById(@PathVariable("id") Integer id){
        return convertToDto(userService.findById(id));
    }

    @GetMapping(path = "/bylogin/{login}")
    public UserDto getByLogin(@PathVariable("login") String login){
        return convertToDto(userService.findByName(login));
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
