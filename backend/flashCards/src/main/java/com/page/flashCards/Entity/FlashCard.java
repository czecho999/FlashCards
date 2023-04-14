package com.page.flashCards.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="flashcard")
@Data
@NoArgsConstructor
public class FlashCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String entry;

    @Column(nullable = false)
    private String definition;

    @ManyToOne
    @JoinColumn(name="chapter_id", nullable=false)
    private Chapter chapter;

}
