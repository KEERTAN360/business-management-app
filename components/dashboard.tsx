"use client"

import { useState, useEffect } from "react"
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
  Legend
} from "recharts"
import { format, parseISO } from "date-fns"

const employeeData = [
  { name: "High Performers", value: 35, fill: "#3b82f6" },
  { name: "Average", value: 45, fill: "#60a5fa" },
  { name: "Needs Improvement", value: 20, fill: "#93c5fd" },
]

type Transaction = {
  id: number
  description: string
  amount: number
  type: string // "income" | "expense"
  category: string
  status: string
  date: string
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/transactions")
        if (res.ok) {
          const data = await res.json()
          setTransactions(data)
        }
      } catch (error) {
        console.error("Failed to fetch transactions", error)
      }
    }
    fetchTransactions()
  }, [])

  // Calculate Totals
  const totalRevenue = transactions
    .filter(t => t.type.toLowerCase() === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type.toLowerCase() === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  // Aggregate Monthly Data
  const monthlyMap = new Map<string, { month: string; revenue: number; expenses: number }>()

  transactions.forEach(t => {
    // Assuming date is YYYY-MM-DD
    const date = parseISO(t.date)
    const monthKey = format(date, "MMM") // e.g. "Jan", "Feb"

    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, { month: monthKey, revenue: 0, expenses: 0 })
    }

    const entry = monthlyMap.get(monthKey)!
    if (t.type.toLowerCase() === "income") {
      entry.revenue += t.amount
    } else {
      entry.expenses += t.amount
    }
  })

  // Convert map to array and potentially sort by month index if needed (simplified here to random order based on data, but usually needs sorting)
  // detailed sort:
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const dashboardData = Array.from(monthlyMap.values()).sort((a, b) => {
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  })

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
            <p className="text-3xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-600">+12.5% from last month</p>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-3xl font-bold text-foreground">${totalExpenses.toLocaleString()}</p>
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
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
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
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
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
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: "#22c55e" }} />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={{ r: 4, fill: "#ef4444" }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
