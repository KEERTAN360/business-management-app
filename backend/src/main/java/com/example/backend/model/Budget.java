package com.example.backend.model;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "budgets")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, length = 100)
    private String category;

    private double allocated;

    @Transient
    private double spent; // Calculated field, not stored in DB

    @Transient
    private String fill; // For frontend color, could store in DB later but keeping simple or random for
                         // now
}
