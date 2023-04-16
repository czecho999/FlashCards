package com.page.flashCards.Repository;

import com.page.flashCards.Entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ChapterRepo extends JpaRepository<Chapter, Integer> {
    ArrayList<Chapter> findAllByTeamId(Integer id);
}
