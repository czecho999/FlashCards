package com.page.flashCards.Dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.page.flashCards.Entity.FlashCard;
import com.page.flashCards.Entity.Team;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterDto {
    private Integer id;
    private String name;
    private Set<FlashCard> flashCards;
    @EqualsAndHashCode.Exclude
    @JsonIgnoreProperties({
            "chapters"
    })
    private Team team;
}
