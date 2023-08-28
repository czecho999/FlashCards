package com.page.flashCards.Repository;

import com.page.flashCards.Entity.Ticket;
import com.page.flashCards.Entity.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface TicketRepo extends JpaRepository<Ticket, Integer> {
    ArrayList<Ticket> findAllByMarkedFlashCard_Chapter_Id(Integer chapterId);

    ArrayList<Ticket> findAllByTypeAndMarkedFlashCard_AddedByAndMarkedFlashCard_Chapter_Id(TicketType type, String addedBy, Integer chapterId);

    void deleteAllByDuplicatedFlashCard_IdOrMarkedFlashCard_Id(Integer duplicatedId, Integer markedId);

    ArrayList<Ticket> findAllByMarkedFlashCard_Id(Integer id);
}
