package com.page.flashCards.Repository;

import com.page.flashCards.Entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChapterRepo extends JpaRepository<Chapter, Integer> {
}
