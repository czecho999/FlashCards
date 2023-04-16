package com.page.flashCards.Controller;

import com.page.flashCards.Dto.CreateTeamDto;
import com.page.flashCards.Entity.Team;
import com.page.flashCards.Service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/team")
public class TeamController {
    private final TeamService teamService;

    @PostMapping
    public Team createTeam(@RequestBody CreateTeamDto createTeamDto){
        System.out.println(createTeamDto);
        return teamService.add(createTeamDto.getName(), createTeamDto.getUsername());
    }
}
