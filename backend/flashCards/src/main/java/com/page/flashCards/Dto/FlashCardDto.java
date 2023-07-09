package com.page.flashCards.Dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    private String addedBy;
    @EqualsAndHashCode.Exclude
    @JsonIgnoreProperties({
            "flashCards",
    })
    private ChapterDto chapter;
}
