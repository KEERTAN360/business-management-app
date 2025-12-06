"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  id: string
  name: string
  completed: boolean
  dueDate: string
}

interface Project {
  id: string
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

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    progress: 75,
    status: "on-track",
    dueDate: "2025-02-15",
    team: "Design",
    description: "Complete redesign of company website with modern UI",
    startDate: "2025-01-01",
    priority: "high",
    milestones: [
      { id: "m1", name: "Design mockups", completed: true, dueDate: "2025-01-15" },
      { id: "m2", name: "Frontend development", completed: true, dueDate: "2025-02-01" },
      { id: "m3", name: "Testing & QA", completed: false, dueDate: "2025-02-10" },
    ],
  },
  {
    id: "2",
    name: "Mobile App Launch",
    progress: 45,
    status: "at-risk",
    dueDate: "2025-03-01",
    team: "Development",
    description: "Launch iOS and Android mobile applications",
    startDate: "2024-12-01",
    priority: "high",
    milestones: [
      { id: "m4", name: "Core features", completed: true, dueDate: "2025-01-20" },
      { id: "m5", name: "Beta testing", completed: false, dueDate: "2025-02-15" },
      { id: "m6", name: "App store submission", completed: false, dueDate: "2025-02-28" },
    ],
  },
  {
    id: "3",
    name: "Q1 Marketing Campaign",
    progress: 100,
    status: "completed",
    dueDate: "2025-01-31",
    team: "Marketing",
    description: "Q1 integrated marketing campaign across all channels",
    startDate: "2024-12-15",
    priority: "medium",
    milestones: [
      { id: "m7", name: "Strategy planning", completed: true, dueDate: "2024-12-20" },
      { id: "m8", name: "Content creation", completed: true, dueDate: "2025-01-10" },
      { id: "m9", name: "Campaign launch", completed: true, dueDate: "2025-01-31" },
    ],
  },
  {
    id: "4",
    name: "Database Migration",
    progress: 60,
    status: "on-track",
    dueDate: "2025-02-28",
    team: "Infrastructure",
    description: "Migrate legacy database to cloud infrastructure",
    startDate: "2025-01-10",
    priority: "medium",
    milestones: [
      { id: "m10", name: "Data audit", completed: true, dueDate: "2025-01-20" },
      { id: "m11", name: "Migration setup", completed: true, dueDate: "2025-02-05" },
      { id: "m12", name: "Validation & testing", completed: false, dueDate: "2025-02-25" },
    ],
  },
]

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
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [filterStatus, setFilterStatus] = useState<"all" | "on-track" | "at-risk" | "completed">("all")

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

  const removeProject = (id: string) => {
    setProjects(projects.filter((proj) => proj.id !== id))
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
        <Button className="gap-2">
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
            {filteredProjects.map((project) => (
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
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
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
            ))}
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
    </div>
  )
}
