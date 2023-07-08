package com.page.flashCards.Service;

import com.page.flashCards.Entity.*;
import com.page.flashCards.Repository.TeamRepo;
import com.page.flashCards.Repository.UsersInTeamRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepo teamRepo;
    private final UserService userService;
    private final ChapterService chapterService;
    private final UsersInTeamRepo usersInTeamRepo;

    @Transactional
    public Team add(String name, String username){
        if(name==null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Team name cannot be empty");
        Team team = new Team(null,name,new HashSet<UsersInTeam>());
        team = teamRepo.save(team);
        User user = userService.findByName(username);
        UsersInTeam usersInTeam = new UsersInTeam(user,team,UserTeamRole.ADMIN);
        usersInTeam = usersInTeamRepo.save(usersInTeam);
        team.getUsers().add(usersInTeam);
        return team;
    }

    public Team findTeamById(Integer id) {
        Optional<Team> team = teamRepo.findById(id);
        if (team.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No team of this id");
        return team.get();
    }

    @Transactional
    public Boolean deleteTeam(Integer id) {
        chapterService.deleteChaptersByTeamId(id);
        List<UsersInTeam> userList = usersInTeamRepo.findAllByTeamId(id);
        Team team =findTeamById(id);
        usersInTeamRepo.deleteAll(userList);
        teamRepo.deleteById(id);
        return (!teamRepo.existsById(id));
    }
}
