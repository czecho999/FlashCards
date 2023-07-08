package com.page.flashCards.Repository;

import com.page.flashCards.Entity.User;
import com.page.flashCards.Entity.UsersInTeam;
import com.page.flashCards.Entity.UsersInTeamsKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersInTeamRepo extends JpaRepository<UsersInTeam, UsersInTeamsKey> {
    List<UsersInTeam> findAllByTeamId(Integer id);
}
