package com.example.backend.controller;

import com.example.backend.model.Budget;
import com.example.backend.model.Transaction;
import com.example.backend.repository.BudgetRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public List<Budget> getAllBudgets() {
        List<Budget> budgets = budgetRepository.findAll();
        List<Transaction> transactions = transactionRepository.findAll();

        // Calculate spent amount for each budget category
        Map<String, Double> spentByCategory = transactions.stream()
                .filter(t -> "expense".equalsIgnoreCase(t.getType()) && "completed".equalsIgnoreCase(t.getStatus()))
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.summingDouble(Transaction::getAmount)));

        budgets.forEach(budget -> {
            budget.setSpent(spentByCategory.getOrDefault(budget.getCategory(), 0.0));
            // Assign a random color if needed, or handle in frontend.
            // For now, let's just let the frontend handle the color 'fill'.
        });

        return budgets;
    }

    @PostMapping
    public Budget createBudget(@RequestBody @NonNull Budget budget) {
        return budgetRepository.save(budget);
    }

    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable @NonNull Long id, @RequestBody @NonNull Budget budgetDetails) {
        return budgetRepository.findById(id).map(budget -> {
            budget.setCategory(budgetDetails.getCategory());
            budget.setAllocated(budgetDetails.getAllocated());
            return budgetRepository.save(budget);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable @NonNull Long id) {
        budgetRepository.deleteById(id);
    }
}
