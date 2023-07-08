package com.page.flashCards.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name="user")
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String login;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

//    @ManyToMany(cascade = CascadeType.DETACH)
//    @JoinTable(
//            name = "Users_teams_connection",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "team_id")
//    )
//    @EqualsAndHashCode.Exclude
//    private Set<Team> teams;

    @OneToMany(mappedBy = "user", cascade = CascadeType.DETACH)
    @EqualsAndHashCode.Exclude
    @JsonIgnoreProperties({"user", "team"})
    private Set<UsersInTeam> teams;

    public void removeTeam(UsersInTeam team){
        this.teams.remove(team);
        team.getTeam().getUsers().remove(this);
    }
}
