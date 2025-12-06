"use client"

import type React from "react"
import { useState } from "react"
import { X, Calendar, DollarSign, User, FileText } from "lucide-react"

interface CreateInvoiceModalProps {
    onClose: () => void
    onSuccess: () => void
    initialClient?: string
}

export function CreateInvoiceModal({ onClose, onSuccess, initialClient = "" }: CreateInvoiceModalProps) {
    const [client, setClient] = useState(initialClient)
    const [number, setNumber] = useState(`INV-${Math.floor(Math.random() * 10000)}`)
    const [amount, setAmount] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [status, setStatus] = useState("pending")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("http://localhost:8080/api/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    number,
                    client,
                    amount: parseFloat(amount),
                    dueDate,
                    status,
                }),
            })

            if (response.ok) {
                onSuccess()
                onClose()
            } else {
                setError("Failed to create invoice")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold text-foreground">Create Invoice</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Invoice Number */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Invoice Number</label>
                        <div className="relative">
                            <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                required
                            />
                        </div>
                    </div>

                    {/* Client */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Client</label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Client Name"
                                required
                            />
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Amount</label>
                        <div className="relative">
                            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="0.00"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Due Date</label>
                        <div className="relative">
                            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="p-3 bg-red-500/10 text-red-500 text-sm rounded-lg">{error}</div>}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isLoading ? "Creating..." : "Create Invoice"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
