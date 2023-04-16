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
        team.getUsers().add(userService.findByName(username));
        return teamRepo.save(team);
        //teamRepo.get.getChapters().add(chapterService.add(new Chapter(null, "Główny", new HashSet<FlashCard>(),team)));
        //teamRepo.save(team);
    }
}
