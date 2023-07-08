package com.page.flashCards.Dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.page.flashCards.Entity.UserTeamRole;
import com.page.flashCards.Entity.UsersInTeamsKey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersInTeamDto {
    UsersInTeamsKey id;
    @JsonIgnoreProperties({
            "teams"
    })
    UserDto user;
    @JsonIgnoreProperties({
            "users"
    })
    TeamDto team;
    UserTeamRole userTeamRole;
}
