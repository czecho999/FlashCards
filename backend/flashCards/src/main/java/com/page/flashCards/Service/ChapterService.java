package com.page.flashCards.Service;

import com.page.flashCards.Entity.Chapter;
import com.page.flashCards.Entity.User;
import com.page.flashCards.Repository.ChapterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChapterService {
    private final ChapterRepo chapterRepo;

    public Chapter add(Chapter chapter) {
        chapterRepo.save(chapter);
        return chapter;
    }

    public Chapter findChapterById(Integer id) {
        Optional<Chapter> chapter = chapterRepo.findById(id);
        if (chapter.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user of this id");
        return chapter.get();
    }
}
