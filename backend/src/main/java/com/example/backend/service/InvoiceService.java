package com.example.backend.service;

import com.example.backend.model.Invoice;
import com.example.backend.model.Transaction;
import com.example.backend.repository.InvoiceRepository;
import com.example.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice createInvoice(Invoice invoice) {
        Invoice savedInvoice = invoiceRepository.save(invoice);
        syncTransaction(savedInvoice);
        return savedInvoice;
    }

    public Invoice updateInvoiceStatus(Long id, String status) {
        return invoiceRepository.findById(id).map(invoice -> {
            invoice.setStatus(status);
            Invoice updatedInvoice = invoiceRepository.save(invoice);
            syncTransaction(updatedInvoice);
            return updatedInvoice;
        }).orElse(null);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.findById(id).ifPresent(invoice -> {
            if (invoice.getTransactionId() != null) {
                transactionRepository.deleteById(invoice.getTransactionId());
            }
            invoiceRepository.deleteById(id);
        });
    }

    private void syncTransaction(Invoice invoice) {
        Transaction transaction;

        if (invoice.getTransactionId() != null) {
            // Update existing transaction
            Optional<Transaction> existingTransaction = transactionRepository.findById(invoice.getTransactionId());
            if (existingTransaction.isPresent()) {
                transaction = existingTransaction.get();
            } else {
                // Should not happen if data is consistent, but handle gracefully
                transaction = new Transaction();
            }
        } else {
            // Check if a transaction for this invoice already exists to prevent duplicates
            String description = "Invoice: " + invoice.getNumber() + " - " + invoice.getClient();
            Optional<Transaction> existingTransaction = transactionRepository.findByDescription(description);

            if (existingTransaction.isPresent()) {
                transaction = existingTransaction.get();
                // Update properties just in case
            } else {
                transaction = new Transaction();
            }
        }

        transaction.setDescription("Invoice: " + invoice.getNumber() + " - " + invoice.getClient());
        transaction.setAmount(invoice.getAmount());
        transaction.setType("income");
        transaction.setCategory("Revenue");
        transaction.setDate(LocalDate.now().toString());

        // Map status
        if ("paid".equalsIgnoreCase(invoice.getStatus())) {
            transaction.setStatus("completed");
        } else {
            transaction.setStatus("pending");
        }

        Transaction savedTransaction = transactionRepository.save(transaction);

        // Update invoice with transaction ID if it's new
        if (invoice.getTransactionId() == null) {
            invoice.setTransactionId(savedTransaction.getId());
            invoiceRepository.save(invoice);
        }
    }
}
