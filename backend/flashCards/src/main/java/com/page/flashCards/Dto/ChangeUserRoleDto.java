package com.page.flashCards.Dto;

import com.page.flashCards.Entity.UserTeamRole;
import com.page.flashCards.Entity.UsersInTeamsKey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeUserRoleDto {
    UsersInTeamsKey id;
    UserTeamRole newRole;
}
