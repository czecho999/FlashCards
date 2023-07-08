package com.page.flashCards.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="user")
@Data
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String login;

    @Column(nullable = false, unique = true)
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

    @Enumerated(EnumType.STRING)
    private Role role;
  
    public void removeTeam(UsersInTeam team){
        this.teams.remove(team);
        team.getTeam().getUsers().remove(this);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return this.login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
