package com.example.backend.model;

import javax.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int progress;
    private String status; // on-track, at-risk, completed
    private String dueDate;
    private String team;

    @Column(length = 1000)
    private String description;

    private String startDate;
    private String priority; // high, medium, low

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "project_id")
    private List<Milestone> milestones;
}
