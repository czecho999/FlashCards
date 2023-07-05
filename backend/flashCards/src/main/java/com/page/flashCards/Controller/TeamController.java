package com.page.flashCards.Controller;

import com.page.flashCards.Dto.*;
import com.page.flashCards.Entity.Chapter;
import com.page.flashCards.Entity.FlashCard;
import com.page.flashCards.Entity.Team;
import com.page.flashCards.Service.ChapterService;
import com.page.flashCards.Service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

@CrossOrigin
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
        return convertToDto(teamService.findTeamById(id));
    }

    @PostMapping(path = "/{id}/chapter")
    public ChapterDto createChapter(@PathVariable("id") Integer id, @RequestBody String chapterName){
        return convertToDto(chapterService.add(new Chapter(null,chapterName.replaceAll("\"",""),new HashSet<FlashCard>(),teamService.findTeamById(id))));
    }

    @GetMapping(path = "/chapter/{id}")
    public ChapterDto getChapterById(@PathVariable("id") Integer id){
        return convertToDto(chapterService.findChapterById(id));
    }
    @GetMapping(path = "/{id}/chapter")
    public ArrayList<ChapterDto> getChaptersByTeamId(@PathVariable("id") Integer id){
        return (ArrayList<ChapterDto>) chapterService.findAllByTeamId(id).stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping(path = "/{id}/flashcards")
    public FlashCardDto addFlashCardToChapter(@PathVariable("id") Integer chapterId, @RequestBody CreateFlashCardDto createFlashCardDto){
        return convertToDto(chapterService.addFlashcard(chapterId,createFlashCardDto));
    }

    @GetMapping(path = "/flashcard/{id}")
    public FlashCardDto getFlashcardById(@PathVariable("id") Integer id){
        return convertToDto(chapterService.findFlashCardById(id));
    }

    @DeleteMapping(path = "/flashcard/{id}")
    public Boolean deleteFlashcard(@PathVariable ("id")Integer id){
        return chapterService.deleteFlashcard(id);
    }

    @DeleteMapping(path = "/chapter/{id}")
    public Boolean deleteChapter(@PathVariable ("id") Integer id){
        return chapterService.deleteChapter(id);
    }

    @DeleteMapping(path = "{id}")
    public Boolean deleteTeam(@PathVariable("id") Integer id){
        return teamService.deleteTeam(id);
    }


    private TeamDto convertToDto(Team team){
        return modelMapper.map(team,TeamDto.class);
    }

    private ChapterDto convertToDto(Chapter chapter){
        return modelMapper.map(chapter, ChapterDto.class);
    }

    private FlashCardDto convertToDto(FlashCard flashCard){
        return modelMapper.map(flashCard, FlashCardDto.class);
    }
}
