package com.page.flashCards.Service;

import com.page.flashCards.Dto.ChapterDto;
import com.page.flashCards.Dto.CreateFlashCardDto;
import com.page.flashCards.Entity.Chapter;
import com.page.flashCards.Entity.FlashCard;
import com.page.flashCards.Entity.User;
import com.page.flashCards.Repository.ChapterRepo;
import com.page.flashCards.Repository.FlashCardRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChapterService {
    private final ChapterRepo chapterRepo;
    private final FlashCardRepo flashCardRepo;

    public Chapter add(Chapter chapter) {
        chapterRepo.save(chapter);
        return chapter;
    }
//    @Transactional
//    public Chapter addFlashcardToChapter(FlashCard){
//    }

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
    public FlashCard addFlashcard(Integer chapterId, CreateFlashCardDto createFlashCardDto) {
        FlashCard flashCard = flashCardRepo.save(new FlashCard(null,createFlashCardDto.getEntry(),createFlashCardDto.getDefinition(),findChapterById(chapterId)));
        chapterRepo.getReferenceById(chapterId).getFlashCards().add(flashCard);
        return flashCard;
    }
}
