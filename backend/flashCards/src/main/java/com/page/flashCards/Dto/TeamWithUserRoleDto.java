package com.page.flashCards.Dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.page.flashCards.Entity.UserTeamRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamWithUserRoleDto {
    private Integer id;
    private String name;
    @EqualsAndHashCode.Exclude
    @JsonIgnoreProperties({
            "team"
    })
    private Set<UsersInTeamDto> users;
    private UserTeamRole loggedUserRole;
}
