package com.page.flashCards.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;


@Entity
@Table(name="chapter")
@Data
@NoArgsConstructor
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "chapter")
    private Set<FlashCard> flashCards;

    @ManyToOne
    @JoinColumn(name="team_id", nullable=false)
    private Team team;

}
