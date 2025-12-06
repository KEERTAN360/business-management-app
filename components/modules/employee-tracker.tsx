"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit2, Award } from "lucide-react"
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
} from "recharts"

interface Employee {
  id: string
  name: string
  role: string
  efficiency: number
  tasksCompleted: number
  hoursWorked: number
  department: string
  rating: number
  attendance: number
}

const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Developer",
    efficiency: 92,
    tasksCompleted: 24,
    hoursWorked: 40,
    department: "Engineering",
    rating: 4.8,
    attendance: 98,
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Designer",
    efficiency: 85,
    tasksCompleted: 18,
    hoursWorked: 38,
    department: "Design",
    rating: 4.5,
    attendance: 95,
  },
  {
    id: "3",
    name: "Carol White",
    role: "Manager",
    efficiency: 88,
    tasksCompleted: 15,
    hoursWorked: 42,
    department: "Management",
    rating: 4.6,
    attendance: 100,
  },
  {
    id: "4",
    name: "David Brown",
    role: "Developer",
    efficiency: 79,
    tasksCompleted: 20,
    hoursWorked: 40,
    department: "Engineering",
    rating: 4.2,
    attendance: 92,
  },
  {
    id: "5",
    name: "Emma Davis",
    role: "QA Engineer",
    efficiency: 91,
    tasksCompleted: 22,
    hoursWorked: 40,
    department: "Quality",
    rating: 4.7,
    attendance: 97,
  },
]

const performanceTrend = [
  { week: "Week 1", efficiency: 82, productivity: 75, quality: 88 },
  { week: "Week 2", efficiency: 84, productivity: 78, quality: 90 },
  { week: "Week 3", efficiency: 86, productivity: 82, quality: 92 },
  { week: "Week 4", efficiency: 87, productivity: 85, quality: 94 },
]

const departmentStats = [
  { department: "Engineering", employees: 2, avgEfficiency: 85.5, tasksCompleted: 44 },
  { department: "Design", employees: 1, avgEfficiency: 85, tasksCompleted: 18 },
  { department: "Management", employees: 1, avgEfficiency: 88, tasksCompleted: 15 },
  { department: "Quality", employees: 1, avgEfficiency: 91, tasksCompleted: 22 },
]

export function EmployeeTracker() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [sortBy, setSortBy] = useState<"efficiency" | "tasks" | "name">("efficiency")

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600"
    if (efficiency >= 80) return "text-blue-600"
    return "text-yellow-600"
  }

  const getPerformanceBadge = (efficiency: number) => {
    if (efficiency >= 90) return "bg-green-100 text-green-800"
    if (efficiency >= 80) return "bg-blue-100 text-blue-800"
    return "bg-yellow-100 text-yellow-800"
  }

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortBy === "efficiency") return b.efficiency - a.efficiency
    if (sortBy === "tasks") return b.tasksCompleted - a.tasksCompleted
    return a.name.localeCompare(b.name)
  })

  const avgEfficiency = (employees.reduce((sum, emp) => sum + emp.efficiency, 0) / employees.length).toFixed(1)
  const totalTasks = employees.reduce((sum, emp) => sum + emp.tasksCompleted, 0)
  const avgAttendance = (employees.reduce((sum, emp) => sum + emp.attendance, 0) / employees.length).toFixed(1)

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Employee Efficiency Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage employee performance metrics.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Employees</p>
          <p className="text-3xl font-bold text-foreground">{employees.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Active team members</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Avg Efficiency</p>
          <p className="text-3xl font-bold text-foreground">{avgEfficiency}%</p>
          <p className="text-xs text-green-600 mt-2">+2.3% from last week</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Tasks Completed</p>
          <p className="text-3xl font-bold text-foreground">{totalTasks}</p>
          <p className="text-xs text-muted-foreground mt-2">This period</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Avg Attendance</p>
          <p className="text-3xl font-bold text-foreground">{avgAttendance}%</p>
          <p className="text-xs text-green-600 mt-2">Excellent</p>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-card border-border overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Employee Rankings</h2>
              <div className="flex gap-2">
                {["efficiency", "tasks", "name"].map((sort) => (
                  <Button
                    key={sort}
                    variant={sortBy === sort ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(sort as any)}
                    className="capitalize"
                  >
                    {sort}
                  </Button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rank</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Efficiency</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tasks</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sortedEmployees.map((employee, index) => (
                    <tr key={employee.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          {index < 3 && <Award className="w-4 h-4 text-yellow-600" />}
                          <span className="font-semibold text-foreground">#{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{employee.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{employee.role}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`font-semibold px-2 py-1 rounded ${getPerformanceBadge(employee.efficiency)}`}>
                          {employee.efficiency}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{employee.tasksCompleted}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-foreground font-semibold">{employee.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEmployee(employee.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="week" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="var(--chart-1)" strokeWidth={2} />
                <Line type="monotone" dataKey="productivity" stroke="var(--chart-2)" strokeWidth={2} />
                <Line type="monotone" dataKey="quality" stroke="var(--chart-3)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Efficiency Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sortedEmployees}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Bar dataKey="efficiency" fill="var(--chart-1)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departmentStats.map((dept) => (
              <Card key={dept.department} className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">{dept.department}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Employees</p>
                    <p className="text-2xl font-bold text-foreground">{dept.employees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg Efficiency</p>
                    <p className="text-2xl font-bold text-foreground">{dept.avgEfficiency}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tasks Completed</p>
                    <p className="text-2xl font-bold text-foreground">{dept.tasksCompleted}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Department Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="department" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgEfficiency" fill="var(--chart-1)" />
                <Bar dataKey="tasksCompleted" fill="var(--chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedEmployees.map((employee) => (
              <Card key={employee.id} className="p-6 bg-card border-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {employee.role} • {employee.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{employee.efficiency}%</p>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tasks Completed:</span>
                    <span className="font-semibold text-foreground">{employee.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours Worked:</span>
                    <span className="font-semibold text-foreground">{employee.hoursWorked}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="font-semibold text-foreground">{employee.rating} ★</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attendance:</span>
                    <span className="font-semibold text-foreground">{employee.attendance}%</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
