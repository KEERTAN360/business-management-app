"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewProjectModal } from "./new-project-modal"
import { EditProjectModal } from "./edit-project-modal"
import { Plus, Trash2, Edit2, Calendar, AlertCircle, CheckCircle2 } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface Milestone {
  id: number
  name: string
  completed: boolean
  dueDate: string
}

interface Project {
  id: number
  name: string
  progress: number
  status: "on-track" | "at-risk" | "completed"
  dueDate: string
  team: string
  description: string
  startDate: string
  milestones: Milestone[]
  priority: "high" | "medium" | "low"
}



const progressTrend = [
  { week: "Week 1", avgProgress: 35, completed: 0, onTrack: 3, atRisk: 1 },
  { week: "Week 2", avgProgress: 45, completed: 0, onTrack: 3, atRisk: 1 },
  { week: "Week 3", avgProgress: 55, completed: 1, onTrack: 2, atRisk: 1 },
  { week: "Week 4", avgProgress: 70, completed: 1, onTrack: 2, atRisk: 1 },
]

const statusDistribution = [
  { name: "Completed", value: 1, fill: "#10b981" },
  { name: "On Track", value: 2, fill: "#3b82f6" },
  { name: "At Risk", value: 1, fill: "#ef4444" },
]

export function ProgressTracker() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filterStatus, setFilterStatus] = useState<"all" | "on-track" | "at-risk" | "completed">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const fetchProjects = () => {
    setIsLoading(true)
    fetch("http://localhost:8080/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err)
        setIsLoading(false)
      })
  }

  React.useEffect(() => {
    fetchProjects()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "on-track":
        return "bg-blue-100 text-blue-800"
      case "at-risk":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const removeProject = (id: number) => {
    // Ideally call API to delete
    fetch(`http://localhost:8080/api/projects/${id}`, { method: "DELETE" })
      .then(() => setProjects(projects.filter((proj) => proj.id !== id)))
      .catch((err) => console.error("Failed to delete project:", err))
  }

  const filteredProjects = filterStatus === "all" ? projects : projects.filter((p) => p.status === filterStatus)

  const completedCount = projects.filter((p) => p.status === "completed").length
  const onTrackCount = projects.filter((p) => p.status === "on-track").length
  const atRiskCount = projects.filter((p) => p.status === "at-risk").length
  const avgProgress = (projects.reduce((sum, p) => sum + p.progress, 0) / projects.length).toFixed(1)

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Progress Tracker</h1>
          <p className="text-muted-foreground">Monitor project progress and milestones.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Projects</p>
          <p className="text-3xl font-bold text-foreground">{projects.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Active projects</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Completed</p>
          <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          <p className="text-xs text-green-600 mt-2">
            {((completedCount / projects.length) * 100).toFixed(0)}% complete
          </p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">On Track</p>
          <p className="text-3xl font-bold text-blue-600">{onTrackCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Progressing well</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">At Risk</p>
          <p className="text-3xl font-bold text-red-600">{atRiskCount}</p>
          <p className="text-xs text-red-600 mt-2">Needs attention</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Avg Progress</p>
          <p className="text-3xl font-bold text-foreground">{avgProgress}%</p>
          <p className="text-xs text-muted-foreground mt-2">Overall completion</p>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="flex gap-2 mb-4">
            {["all", "on-track", "at-risk", "completed"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status as any)}
                className="capitalize"
              >
                {status === "all" ? "All" : status.replace("-", " ")}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const allMilestonesCompleted = project.milestones && project.milestones.length > 0 && project.milestones.every(m => m.completed)

              return (
                <Card key={project.id} className="p-6 bg-card border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status.replace("-", " ")}
                        </span>
                        <span className={`text-xs font-semibold uppercase ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Team: {project.team} • Started: {project.startDate} • Due: {project.dueDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {allMilestonesCompleted && project.status !== "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                          onClick={() => {
                            const updatedProject = { ...project, status: "completed" };
                            fetch(`http://localhost:8080/api/projects/${project.id}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(updatedProject)
                            })
                              .then(res => {
                                if (res.ok) fetchProjects();
                              })
                              .catch(err => console.error("Failed to update project status", err));
                          }}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Mark Completed
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => setEditingProject(project)}>
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeProject(project.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-semibold text-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">MILESTONES</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                          {milestone.completed ? (
                            <CheckCircle2 className="w-3 h-3 text-green-600" />
                          ) : (
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                          )}
                          <span
                            className={milestone.completed ? "line-through text-muted-foreground" : "text-foreground"}
                          >
                            {milestone.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Project Timeline</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="flex gap-4 items-start">
                  <div className="w-32 flex-shrink-0">
                    <p className="text-sm font-semibold text-foreground">{project.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {project.startDate} to {project.dueDate}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                  <div className="w-12 text-right">
                    <p className="text-sm font-semibold text-foreground">{project.progress}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Project Status Distribution</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Progress Trend</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" dataKey="week" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgProgress" stroke="var(--chart-1)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Project Status Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="week" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="var(--chart-1)" />
                <Bar dataKey="onTrack" fill="var(--chart-2)" />
                <Bar dataKey="atRisk" fill="var(--chart-4)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-6">
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">{project.name}</h3>
                <div className="space-y-3">
                  {project.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-3 p-3 bg-muted rounded">
                      {milestone.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p
                          className={`font-medium ${milestone.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                        >
                          {milestone.name}
                        </p>
                        <p className="text-xs text-muted-foreground">Due: {milestone.dueDate}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${milestone.completed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {milestone.completed ? "Done" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

      </Tabs>

      {
        isModalOpen && (
          <NewProjectModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={fetchProjects}
          />
        )
      }

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={() => {
            setEditingProject(null)
            fetchProjects()
          }}
        />
      )}
    </div >
  )
}
