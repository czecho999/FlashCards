package com.page.flashCards.Repository;

import com.page.flashCards.Entity.FlashCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlashCardRepo extends JpaRepository<FlashCard, Integer> {

}
