package com.page.flashCards.Service;

import com.page.flashCards.Entity.Chapter;
import com.page.flashCards.Repository.ChapterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChapterService {
    private final ChapterRepo chapterRepo;

    public Chapter add(Chapter chapter) {
        chapterRepo.save(chapter);
        return chapter;
    }
}
