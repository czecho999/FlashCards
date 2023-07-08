package com.page.flashCards.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Table(name="users_in_team")
@Entity
public class UsersInTeam {
    @EmbeddedId
    private UsersInTeamsKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("teamId")
    @JoinColumn(name = "team_id")
    private Team team;

    @Column
    @Enumerated
    private UserTeamRole userTeamRole;

    public UsersInTeam(User user, Team team, UserTeamRole userTeamRole) {
        this.id = new UsersInTeamsKey(user.getId(), team.getId());
        this.user = user;
        this.team = team;
        this.userTeamRole = userTeamRole;
    }
}
