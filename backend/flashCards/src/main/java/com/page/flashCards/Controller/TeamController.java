package com.page.flashCards.Controller;

import com.page.flashCards.Dto.ChapterDto;
import com.page.flashCards.Dto.CreateTeamDto;
import com.page.flashCards.Dto.TeamDto;
import com.page.flashCards.Entity.Chapter;
import com.page.flashCards.Entity.FlashCard;
import com.page.flashCards.Entity.Team;
import com.page.flashCards.Service.ChapterService;
import com.page.flashCards.Service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/team")
public class TeamController {
    private final TeamService teamService;
    private final ChapterService chapterService;

    private final ModelMapper modelMapper;
    @PostMapping
    public Team createTeam(@RequestBody CreateTeamDto createTeamDto){
        return teamService.add(createTeamDto.getName(), createTeamDto.getUsername());
    }

    @GetMapping(path = "/{id}")
    public TeamDto getTeamById(@PathVariable("id") Integer id){
        System.out.println(teamService.findTeamById(id).getChapters());
        return convertToDto(teamService.findTeamById(id));
    }

    @PostMapping(path = "/{id}/chapter")
    public ChapterDto createChapter(@PathVariable("id") Integer id, @RequestBody String chapterName){
        return convertToDto(chapterService.add(new Chapter(null,chapterName,new HashSet<FlashCard>()/*,teamService.findTeamById(id)*/)));
    }

    @GetMapping(path = "/chapter/{id}")
    public ChapterDto getChapterById(@PathVariable("id") Integer id){
        return convertToDto(chapterService.findChapterById(id));
    }

    private TeamDto convertToDto(Team team){
        return modelMapper.map(team,TeamDto.class);
    }

    private ChapterDto convertToDto(Chapter chapter){
        return modelMapper.map(chapter, ChapterDto.class);
    }
    //@PutMapping(path = "/")
}
