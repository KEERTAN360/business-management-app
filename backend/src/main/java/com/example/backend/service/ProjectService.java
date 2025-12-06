package com.example.backend.service;

import com.example.backend.model.Project;
import com.example.backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(@NonNull Project project) {
        return projectRepository.save(project);
    }

    public Optional<Project> getProjectById(@NonNull Long id) {
        return projectRepository.findById(id);
    }

    public void deleteProject(@NonNull Long id) {
        projectRepository.deleteById(id);
    }

    public Project updateProject(@NonNull Long id, @NonNull Project projectDetails) {
        return projectRepository.findById(id)
                .map(project -> {
                    project.setName(projectDetails.getName());
                    project.setDescription(projectDetails.getDescription());
                    project.setDueDate(projectDetails.getDueDate());
                    project.setStartDate(projectDetails.getStartDate());
                    project.setTeam(projectDetails.getTeam());
                    project.setPriority(projectDetails.getPriority());
                    project.setStatus(projectDetails.getStatus());
                    project.setProgress(projectDetails.getProgress());

                    project.getMilestones().clear();
                    if (projectDetails.getMilestones() != null) {
                        project.getMilestones().addAll(projectDetails.getMilestones());
                    }

                    return projectRepository.save(project);
                })
                .orElse(null);
    }
}
