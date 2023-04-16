package com.page.flashCards.Controller;

import com.page.flashCards.Dto.CreateTeamDto;
import com.page.flashCards.Dto.TeamDto;
import com.page.flashCards.Entity.Team;
import com.page.flashCards.Service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/team")
public class TeamController {
    private final TeamService teamService;

    private final ModelMapper modelMapper;
    @PostMapping
    public Team createTeam(@RequestBody CreateTeamDto createTeamDto){
        System.out.println(createTeamDto);
        return teamService.add(createTeamDto.getName(), createTeamDto.getUsername());
    }

    @GetMapping(path = "/{id}")
    public TeamDto getTeamById(@PathVariable("id") Integer id){
        return convertToDto(teamService.findTeamById(id));
    }

    private TeamDto convertToDto(Team team){
        return modelMapper.map(team,TeamDto.class);
    }
    //@PutMapping(path = "/")
}
