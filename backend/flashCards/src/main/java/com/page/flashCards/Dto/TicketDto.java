package com.page.flashCards.Dto;

import com.page.flashCards.Entity.TicketType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {

    private Integer id;

    private String comment;

    private TicketType type;

    private String raisedBy;

    @EqualsAndHashCode.Exclude

    private FlashCardDto markedFlashCard;

    @EqualsAndHashCode.Exclude

    private FlashCardDto duplicatedFlashCard;
}
