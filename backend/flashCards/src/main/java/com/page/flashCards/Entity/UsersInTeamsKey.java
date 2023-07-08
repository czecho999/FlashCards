package com.page.flashCards.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UsersInTeamsKey implements Serializable {

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "team_id")
    private Integer teamId;
}
