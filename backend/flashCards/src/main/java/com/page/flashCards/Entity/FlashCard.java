package com.page.flashCards.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name="flashcard")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlashCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String entry;

    @Column(nullable = false, length = 2048)
    private String definition;

    @Column
    private String fileName;

    @Column
    private String addedBy;

    @EqualsAndHashCode.Exclude
    @ManyToOne
    @JoinColumn(name="chapter_id", nullable=false)
    private Chapter chapter;

    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "markedFlashCard", cascade = CascadeType.ALL)
    private Set<Ticket> ticket;

}
