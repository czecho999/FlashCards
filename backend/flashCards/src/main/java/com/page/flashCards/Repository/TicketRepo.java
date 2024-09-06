package com.page.flashCards.Repository;

import com.page.flashCards.Entity.Ticket;
import com.page.flashCards.Entity.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TicketRepo extends JpaRepository<Ticket, Integer> {
    ArrayList<Ticket> findAllByMarkedFlashCard_Chapter_Id(Integer chapterId);
    ArrayList<Ticket> findAllByTypeAndMarkedFlashCard_AddedByAndMarkedFlashCard_Chapter_Id(TicketType type, String addedBy, Integer chapterId);
    void deleteAllByDuplicatedFlashCard_IdOrMarkedFlashCard_Id(Integer duplicatedId, Integer markedId);
    ArrayList<Ticket> findAllByMarkedFlashCard_Id(Integer id);
}
