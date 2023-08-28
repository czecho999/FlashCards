package com.page.flashCards.Dto;

import com.page.flashCards.Entity.TicketType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RaiseTicketDto {
    private String comment;
    private TicketType type;
    private Integer duplicatedId;
}
