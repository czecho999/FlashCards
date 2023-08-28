package com.page.flashCards.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.util.Set;


@Entity
@Table(name="chapter")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @EqualsAndHashCode.Exclude
    @OrderBy("id ASC ")
    @OneToMany(mappedBy = "chapter", cascade = CascadeType.ALL)
    private Set<FlashCard> flashCards;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="team_id")
    private Team team;

}
