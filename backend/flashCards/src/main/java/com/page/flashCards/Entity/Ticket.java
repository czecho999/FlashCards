package com.page.flashCards.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name="ticket")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String comment;

    @Column(nullable = false)
    @Enumerated
    private TicketType type;

    @Column
    private String raisedBy;

    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name = "marked_flashcard_id", nullable = false)
    private FlashCard markedFlashCard;

    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name = "duplicated_flashcard_id")
    private FlashCard duplicatedFlashCard;
}
