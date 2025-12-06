"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Calendar, User, Flag, AlignLeft, Receipt, CheckSquare, Square } from "lucide-react"
import { CreateInvoiceModal } from "./create-invoice-modal"

interface Milestone {
    id?: number
    name: string
    completed: boolean
    dueDate: string
}

interface Project {
    id: number
    name: string
    progress: number
    status: string
    dueDate: string
    team: string
    description: string
    startDate: string
    milestones: Milestone[]
    priority: string
}

interface EditProjectModalProps {
    project: Project
    onClose: () => void
    onSuccess: () => void
}

export function EditProjectModal({ project, onClose, onSuccess }: EditProjectModalProps) {
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [team, setTeam] = useState(project.team)
    const [dueDate, setDueDate] = useState(project.dueDate)
    const [priority, setPriority] = useState(project.priority)
    const [startDate] = useState(project.startDate)
    const [status, setStatus] = useState(project.status)
    const [milestones, setMilestones] = useState<Milestone[]>(project.milestones || [])
    const [showInvoiceModal, setShowInvoiceModal] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    // Auto-calculate progress when milestones change
    useEffect(() => {
        if (milestones.length > 0) {
            const completedCount = milestones.filter(m => m.completed).length
            // This is purely for visual feedback in this modal, the real update happens on save
        }
    }, [milestones])

    const toggleMilestone = (index: number) => {
        const updatedMilestones = [...milestones]
        updatedMilestones[index].completed = !updatedMilestones[index].completed
        setMilestones(updatedMilestones)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Calculate new progress based on milestones
        let newProgress = 0
        if (milestones.length > 0) {
            const completedCount = milestones.filter(m => m.completed).length
            newProgress = Math.round((completedCount / milestones.length) * 100)
        }

        try {
            const response = await fetch(`http://localhost:8080/api/projects/${project.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    team,
                    dueDate,
                    priority,
                    startDate,
                    progress: newProgress,
                    status,
                    milestones: milestones
                }),
            })

            if (response.ok) {
                onSuccess()
                onClose()
            } else {
                setError("Failed to update project")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
                    <h2 className="text-xl font-bold text-foreground">Edit Project</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Project Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-3 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full pl-3 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Team */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Team</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    value={team}
                                    onChange={(e) => setTeam(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    required
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full pl-3 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                            >
                                <option value="on-track">On Track</option>
                                <option value="at-risk">At Risk</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Milestones Progress Tracker */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Milestones (Check to Complete)</label>
                        <div className="space-y-2 max-h-40 overflow-y-auto bg-muted/30 p-2 rounded-lg border border-border">
                            {milestones.length === 0 && <p className="text-sm text-muted-foreground text-center py-2">No milestones</p>}
                            {milestones.map((m, idx) => (
                                <div key={idx}
                                    className="flex items-center gap-3 p-2 hover:bg-muted/80 rounded cursor-pointer transition-colors"
                                    onClick={() => toggleMilestone(idx)}
                                >
                                    {m.completed ?
                                        <CheckSquare className="text-green-500 w-5 h-5 flex-shrink-0" /> :
                                        <Square className="text-muted-foreground w-5 h-5 flex-shrink-0" />
                                    }
                                    <span className={`text-sm ${m.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                        {m.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-right">
                            Progress will update upon saving.
                        </p>
                    </div>

                    {/* Invoice Creation */}
                    <div className="pt-2 border-t border-border">
                        <button
                            type="button"
                            onClick={() => setShowInvoiceModal(true)}
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                            <Receipt size={16} />
                            Create Invoice for this Project
                        </button>
                    </div>

                    {error && <div className="p-3 bg-red-500/10 text-red-500 text-sm rounded-lg">{error}</div>}

                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
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
                            {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>

            {showInvoiceModal && (
                <CreateInvoiceModal
                    onClose={() => setShowInvoiceModal(false)}
                    onSuccess={() => {
                        setShowInvoiceModal(false)
                        // Optionally show a toast here
                    }}
                    initialClient={name} // Pass project name as client name suggestion
                />
            )}
        </div>
    )
}
