package com.page.flashCards.Dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Integer id;
    private String login;
    private String email;
    @EqualsAndHashCode.Exclude
    @JsonIgnoreProperties({
            "user"
    })
    private Set<UsersInTeamDto> teams;
}
