"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const dashboardData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 2000, expenses: 9800 },
  { month: "Apr", revenue: 2780, expenses: 3908 },
  { month: "May", revenue: 1890, expenses: 4800 },
  { month: "Jun", revenue: 2390, expenses: 3800 },
]

const employeeData = [
  { name: "High Performers", value: 35, fill: "#3b82f6" },
  { name: "Average", value: 45, fill: "#60a5fa" },
  { name: "Needs Improvement", value: 20, fill: "#93c5fd" },
]

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 font-medium transition-all duration-300 rounded-xl text-foreground"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)"
            }}
          >
            Export Report
          </button>
          <button
            className="px-4 py-2 font-medium transition-all duration-300 rounded-xl text-foreground"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)"
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)"
            }}
          >
            Settings
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-3xl font-bold text-foreground">$16,060</p>
            <p className="text-xs text-green-600">+12.5% from last month</p>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-3xl font-bold text-foreground">$22,706</p>
            <p className="text-xs text-red-600">+8.2% from last month</p>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Active Employees</p>
            <p className="text-3xl font-bold text-foreground">48</p>
            <p className="text-xs text-blue-600">+2 new hires</p>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Upcoming Events</p>
            <p className="text-3xl font-bold text-foreground">7</p>
            <p className="text-xs text-purple-600">3 this week</p>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-card border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Bar dataKey="revenue" fill="var(--chart-1)" />
              <Bar dataKey="expenses" fill="var(--chart-2)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Employee Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {employeeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card className="p-6 bg-card border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dashboardData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke="var(--chart-2)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
