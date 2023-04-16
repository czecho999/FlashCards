package com.page.flashCards.Dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.page.flashCards.Entity.Chapter;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlashCardDto {
    private Integer id;

    private String entry;

    private String definition;

    @EqualsAndHashCode.Exclude
    @JsonIgnoreProperties({
            "flashcards",
    })
    private ChapterDto chapter;
}
