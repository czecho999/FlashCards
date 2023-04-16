package com.page.flashCards.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
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

    @OneToMany(mappedBy = "chapter")
    private Set<FlashCard> flashCards;

//    @ManyToOne(mappedBy = "chapters",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinColumn(name="team_id")
//    private Team team;

}
