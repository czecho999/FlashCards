package com.page.flashCards.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name="team")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

//    @ManyToMany(mappedBy = "teams", cascade = CascadeType.DETACH)
//    @EqualsAndHashCode.Exclude
//    private Set<User> users;

    @EqualsAndHashCode.Exclude
    @JsonIgnoreProperties({
            "team", "user"
    })
    @OneToMany(mappedBy = "team")
    private Set<UsersInTeam> users;
}
