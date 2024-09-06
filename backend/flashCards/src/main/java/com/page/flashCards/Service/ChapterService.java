package com.page.flashCards.Service;

import com.page.flashCards.Dto.ChapterDto;
import com.page.flashCards.Dto.CreateFlashCardDto;
import com.page.flashCards.Dto.RaiseTicketDto;
import com.page.flashCards.Entity.*;
import com.page.flashCards.Repository.ChapterRepo;
import com.page.flashCards.Repository.FlashCardRepo;
import com.page.flashCards.Repository.TicketRepo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChapterService {
    private final ChapterRepo chapterRepo;
    private final FlashCardRepo flashCardRepo;

    private final TicketRepo ticketRepo;

    private final String FOLDER_PATH="C:\\Studia\\Licencjat\\backend\\flashCards\\src\\main\\resources\\static\\image\\";
    public Chapter add(Chapter chapter) {
        chapterRepo.save(chapter);
        return chapter;
    }

    public Chapter findChapterById(Integer id) {
        Optional<Chapter> chapter = chapterRepo.findById(id);
        if (chapter.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No chapter of this id");
        return chapter.get();
    }

    public ArrayList<Chapter> findAllByTeamId(Integer id) {
        return chapterRepo.findAllByTeamId(id);
    }

    @Transactional
    public FlashCard addFlashcard(Integer chapterId, CreateFlashCardDto createFlashCardDto, String user) {
        FlashCard flashCard = flashCardRepo.save(new FlashCard(null,createFlashCardDto.getEntry(),createFlashCardDto.getDefinition(), null, user, findChapterById(chapterId),new HashSet<Ticket>()));

        if(createFlashCardDto.getFileName()!=null){
            flashCard=flashCardRepo.findById(flashCard.getId()).get();
            flashCard.setFileName(flashCard.getId().toString()+createFlashCardDto.getFileName());
        }

        chapterRepo.getReferenceById(chapterId).getFlashCards().add(flashCard);
        return flashCard;
    }

    public String uploadImageToFlashCard(MultipartFile file) throws IOException {
        String filePath=FOLDER_PATH+file.getOriginalFilename();

        file.transferTo(new File(filePath));

        return "file uploaded successfully : " + filePath;
    }

    @Transactional
    public Boolean deleteFlashcard(Integer id) {
        ticketRepo.deleteAllByDuplicatedFlashCard_IdOrMarkedFlashCard_Id(id, id);
        flashCardRepo.deleteById(id);
        return (!flashCardRepo.existsById(id));
    }

    public Boolean deleteChapter(Integer id) {
        chapterRepo.deleteById(id);
        return (!chapterRepo.existsById(id));
    }
    @Transactional
    public Boolean deleteChaptersByTeamId(Integer id) {
        chapterRepo.deleteAllByTeamId(id);
        return true;
    }

    public FlashCard findFlashCardById(Integer id) {
        Optional<FlashCard> flashCard = flashCardRepo.findById(id);
        if (flashCard.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No flashcard of this id");
        return flashCard.get();
    }

    @Transactional
    public FlashCard changeFlashcardById(Integer id, CreateFlashCardDto changedFlashcard) {
        Optional<FlashCard> flashCard = flashCardRepo.findById(id);
        if (flashCard.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No flashcard of this id");

        flashCard.get().setEntry(changedFlashcard.getEntry());
        flashCard.get().setDefinition(changedFlashcard.getDefinition());

        ArrayList<Ticket> tickets = ticketRepo.findAllByMarkedFlashCard_Id(id);

        for (Ticket ticket : tickets){
            ticket.setType(TicketType.RESOLVED);
        }

        return flashCard.get();
    }

    public byte[] downloadImageByFlashCard(Integer flashcardId) throws IOException{
        String filename = flashCardRepo.findById(flashcardId).get().getFileName();
        byte[] images = Files.readAllBytes(new File(FOLDER_PATH+filename).toPath());
        return images;
    }

    @Transactional
    public Ticket addTicket(RaiseTicketDto raiseTicketDto, Integer flashCardId, String raisedBy) {
        Ticket newTicket = new Ticket(null, raiseTicketDto.getComment(), raiseTicketDto.getType(),
                raisedBy, flashCardRepo.getById(flashCardId),
                (raiseTicketDto.getDuplicatedId()!=null ? flashCardRepo.getById(raiseTicketDto.getDuplicatedId()) : null));
        return ticketRepo.save(newTicket);
    }


    public ArrayList<Ticket> findAllTicketsByChapterId(Integer chapterId) {
        return ticketRepo.findAllByMarkedFlashCard_Chapter_Id(chapterId);
    }


    public ArrayList<Ticket> findToCorrectByChapterAndUser(Integer chapterId, String user) {
        return ticketRepo.findAllByTypeAndMarkedFlashCard_AddedByAndMarkedFlashCard_Chapter_Id(TicketType.TO_CORRECT, user, chapterId);
    }


    @Transactional
    public Ticket setTicketToCorrect(Integer id) {
        Ticket ticket = ticketRepo.findById(id).get();
        ticket.setType(TicketType.TO_CORRECT);
        return ticket;
    }

    @Transactional
    public Ticket setTicketResolved(Integer id) {
        Ticket ticket = ticketRepo.findById(id).get();
        ticket.setType(TicketType.RESOLVED);
        return ticket;
    }
}
