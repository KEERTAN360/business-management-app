"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, User, Flag, AlignLeft } from "lucide-react"

interface NewProjectModalProps {
    onClose: () => void
    onSuccess: () => void
}

export function NewProjectModal({ onClose, onSuccess }: NewProjectModalProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [team, setTeam] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [priority, setPriority] = useState("medium")
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const [milestones, setMilestones] = useState<{ name: string; completed: boolean; dueDate: string }[]>([])
    const [newMilestoneName, setNewMilestoneName] = useState("")

    const addMilestone = () => {
        if (newMilestoneName.trim()) {
            setMilestones([...milestones, { name: newMilestoneName, completed: false, dueDate: dueDate }])
            setNewMilestoneName("")
        }
    }

    const removeMilestone = (index: number) => {
        setMilestones(milestones.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("http://localhost:8080/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    team,
                    dueDate,
                    priority,
                    startDate,
                    progress: 0,
                    status: "on-track",
                    milestones: milestones
                }),
            })

            if (response.ok) {
                onSuccess()
                onClose()
            } else {
                setError("Failed to create project")
            }
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm shadow-xl">
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
                    <h2 className="text-xl font-bold text-foreground">New Project</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Project Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-3 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="e.g. Website Redesign"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                        <div className="relative">
                            <AlignLeft size={16} className="absolute left-3 top-3 text-muted-foreground" />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-json"
                                placeholder="Project goals and details..."
                                rows={3}
                            />
                        </div>
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
                                    placeholder="e.g. Marketing"
                                    required
                                />
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Priority</label>
                            <div className="relative">
                                <Flag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
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

                    {/* Milestones */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Milestones</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newMilestoneName}
                                onChange={(e) => setNewMilestoneName(e.target.value)}
                                className="flex-1 pl-3 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Milestone name"
                            />
                            <button type="button" onClick={addMilestone} className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90">
                                Add
                            </button>
                        </div>
                        <ul className="space-y-1 max-h-32 overflow-y-auto">
                            {milestones.map((m, idx) => (
                                <li key={idx} className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded">
                                    <span>{m.name}</span>
                                    <button type="button" onClick={() => removeMilestone(idx)} className="text-red-500 hover:text-red-700">
                                        <X size={14} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {error && <div className="p-3 bg-red-500/10 text-red-500 text-sm rounded-lg">{error}</div>}

                    <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
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
                            {isLoading ? "Creating..." : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
