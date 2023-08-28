package com.page.flashCards.Controller;

import com.page.flashCards.Config.Security.JwtService;
import com.page.flashCards.Dto.*;
import com.page.flashCards.Entity.Chapter;
import com.page.flashCards.Entity.FlashCard;
import com.page.flashCards.Entity.Team;
import com.page.flashCards.Entity.Ticket;
import com.page.flashCards.Service.ChapterService;
import com.page.flashCards.Service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/team")
public class TeamController {
    private final TeamService teamService;
    private final ChapterService chapterService;

    private final ModelMapper modelMapper;

    private final JwtService jwtService;
    @PostMapping
    public Team createTeam(@RequestBody CreateTeamDto createTeamDto){
        return teamService.add(createTeamDto.getName(), createTeamDto.getUsername());
    }

    @GetMapping(path = "/{id}")
    public TeamDto getTeamById(@PathVariable("id") Integer id){
        return convertToDto(teamService.findTeamById(id));
    }

    @PostMapping(path= "/addUser")
    public TeamDto addUser(@RequestBody AddUserToTeamDto addUserToTeamDto){
        return convertToDto(teamService.addUser(addUserToTeamDto));
    }

    @PutMapping(path = "/changeUserRole")
    public TeamDto changeUserRole(@RequestBody ChangeUserRoleDto changeUserRoleDto){
        return convertToDto(teamService.changeUserRole(changeUserRoleDto));
    }

    @PostMapping(path = "/{id}/chapter")
    public ChapterDto createChapter(@PathVariable("id") Integer id, @RequestBody String chapterName){
        return convertToDto(chapterService.add(new Chapter(null,chapterName.replaceAll("\"",""),new LinkedHashSet<FlashCard>(),teamService.findTeamById(id))));
    }

    @GetMapping(path = "/chapter/{id}")
    public ChapterDto getChapterById(@PathVariable("id") Integer id) throws ResponseStatusException {
        return convertToDto(chapterService.findChapterById(id));
    }
    @GetMapping(path = "/{id}/chapter")
    public ArrayList<ChapterDto> getChaptersByTeamId(@PathVariable("id") Integer id){
        return (ArrayList<ChapterDto>) chapterService.findAllByTeamId(id).stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping(path = "/{id}/flashcards")
    public FlashCardDto addFlashCardToChapter(@PathVariable("id") Integer chapterId, @RequestBody CreateFlashCardDto createFlashCardDto, @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader){
        String user = jwtService.extractUsername(authHeader.split(" ")[1]);
        return convertToDto(chapterService.addFlashcard(chapterId,createFlashCardDto, user));
    }

    @PostMapping("/{flashcardId}/addImage")
    public String addImageToFlashcard(@PathVariable Integer flashcardId, @RequestParam("image") MultipartFile file) throws IOException {
        return chapterService.uploadImageToFlashCard(file);
    }

    @GetMapping("/getImage/{flashcardId}")
    public ResponseEntity<?> downloadImageByFlashcardId (@PathVariable Integer flashcardId) throws IOException{
        byte[] imageData=chapterService.downloadImageByFlashCard(flashcardId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }

    @GetMapping(path = "/flashcard/{id}")
    public FlashCardDto getFlashcardById(@PathVariable("id") Integer id){
        return convertToDto(chapterService.findFlashCardById(id));
    }

    @PutMapping(path = "/flashcard/{id}")
    public FlashCardDto changeFlashcardById(@PathVariable("id") Integer id, @RequestBody CreateFlashCardDto changedFlashcard){
        return convertToDto(chapterService.changeFlashcardById(id, changedFlashcard));
    }

    @PostMapping(path = "/raiseTicket/{flashCardId}")
    public TicketDto raiseTicket(@PathVariable("flashCardId") Integer flashCardId, @RequestBody RaiseTicketDto raiseTicketDto, @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader){
        String user = jwtService.extractUsername(authHeader.split(" ")[1]);
        return convertToDto(chapterService.addTicket(raiseTicketDto, flashCardId, user));
    }

    @GetMapping(path = "/ticketsInChapter/{chapterId}")
    public ArrayList<TicketDto> getTicketsInChapter(@PathVariable("chapterId") Integer chapterId){
        return (ArrayList<TicketDto>) chapterService.findAllTicketsByChapterId(chapterId).stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }

    @GetMapping(path = "/toCorrectByChapterAndUser/{chapterId}")
    public ArrayList<TicketDto> getTicketsToCorrect(@PathVariable("chapterId") Integer chapterId, @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader){
        String user = jwtService.extractUsername(authHeader.split(" ")[1]);
        return (ArrayList<TicketDto>) chapterService.findToCorrectByChapterAndUser(chapterId, user).stream()
                .map(this::convertToDto).collect(Collectors.toList());
    }

    @PutMapping(path = "/setTicketToCorrect/{ticketId}")
    public TicketDto setTicketToCorrect(@PathVariable("ticketId") Integer id){
        return convertToDto(chapterService.setTicketToCorrect(id));
    }

    @PutMapping(path = "setTicketResolved/{ticketId}")
    public TicketDto setTicketResolved(@PathVariable("ticketId") Integer id){
        return convertToDto(chapterService.setTicketResolved(id));
    }

    @DeleteMapping(path="/removeUser/{teamId}/{userId}")
    public Boolean removeUserFromTeam(@PathVariable("teamId") Integer teamId, @PathVariable("userId") Integer userId){
        return teamService.removeUser(teamId, userId);
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

    private TicketDto convertToDto(Ticket ticket){ return modelMapper.map(ticket, TicketDto.class);}
}
