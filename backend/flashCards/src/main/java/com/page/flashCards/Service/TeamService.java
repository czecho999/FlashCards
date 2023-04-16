package com.page.flashCards.Service;

import com.page.flashCards.Entity.Chapter;
import com.page.flashCards.Entity.FlashCard;
import com.page.flashCards.Entity.Team;
import com.page.flashCards.Entity.User;
import com.page.flashCards.Repository.TeamRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepo teamRepo;
    private final UserService userService;
    private final ChapterService chapterService;

    public Team add(String name, String username){
        if(name==null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Team name cannot be empty");
        Team team = new Team(null,name,new HashSet<Chapter>(),new HashSet<User>());
        userService.findByName(username).getTeams().add(team);
//        Chapter chapter=new Chapter(null, "Główny", new HashSet<FlashCard>(),null);
//        chapterService.add(chapter);
//        team.getChapters().add(chapter);
        //team.getChapters().add(chapter);
        return teamRepo.save(team);
    }

    public Team findTeamById(Integer id) {
        Optional<Team> team = teamRepo.findById(id);
        if (team.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No team of this id");
        return team.get();
    }
}
