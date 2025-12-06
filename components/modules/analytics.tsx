"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
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
import { TrendingUp, TrendingDown, Filter, DollarSign, Briefcase, PieChart as PieChartIcon } from "lucide-react"

// Types matching Backend Models roughly
type Transaction = {
  id: number
  description: string
  amount: number
  type: string // "income" | "expense"
  category: string
  status: string
  date: string
}

type Project = {
  id: number
  name: string
  status: string // "on-track" | "at-risk" | "completed"
  priority: string
}

type Budget = {
  id: number
  category: string
  allocated: number
  spent: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function Analytics() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])

  useEffect(() => {
    // Fetch all required data
    const fetchData = async () => {
      try {
        const [txRes, projRes, budgRes] = await Promise.all([
          fetch("http://localhost:8080/api/transactions"),
          fetch("http://localhost:8080/api/projects"),
          fetch("http://localhost:8080/api/budgets"),
        ])

        if (txRes.ok) setTransactions(await txRes.json())
        if (projRes.ok) setProjects(await projRes.json())
        if (budgRes.ok) setBudgets(await budgRes.json())
      } catch (error) {
        console.error("Failed to fetch analytics data", error)
      }
    }

    fetchData()
  }, [])

  // --- Data Processing for Charts ---

  // 1. Financial Overview (KPIs)
  const totalIncome = transactions
    .filter((t) => t.type.toLowerCase() === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type.toLowerCase() === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const netProfit = totalIncome - totalExpense
  const activeProjects = projects.filter((p) => p.status !== "completed").length

  // 2. Financial Trends (Area Chart)
  // Group by date, sum income and expense
  const trendDataMap = new Map<string, { date: string; income: number; expense: number }>()

  transactions.forEach((t) => {
    const date = t.date;
    if (!trendDataMap.has(date)) {
      trendDataMap.set(date, { date, income: 0, expense: 0 })
    }
    const entry = trendDataMap.get(date)!
    if (t.type.toLowerCase() === "income") entry.income += t.amount
    else entry.expense += t.amount
  })

  const trendData = Array.from(trendDataMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // 3. Expense by Category (Pie Chart)
  const expenseCategoryMap = new Map<string, number>()
  transactions
    .filter(t => t.type.toLowerCase() === "expense")
    .forEach(t => {
      const current = expenseCategoryMap.get(t.category) || 0
      expenseCategoryMap.set(t.category, current + t.amount)
    })

  const expenseCategoryData = Array.from(expenseCategoryMap.entries()).map(([name, value]) => ({ name, value }))


  // 4. Project Status (Pie Chart)
  const projectStatusMap = new Map<string, number>()
  projects.forEach(p => {
    const status = p.status || "Unknown"
    projectStatusMap.set(status, (projectStatusMap.get(status) || 0) + 1)
  })
  const projectStatusData = Array.from(projectStatusMap.entries()).map(([name, value]) => ({ name, value }))


  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time insights into your business performance.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-100 bg-green-600 p-1.5 rounded-full" />
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">${totalExpense.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-100 bg-red-600 p-1.5 rounded-full" />
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-primary' : 'text-red-500'}`}>
                ${netProfit.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-primary-foreground bg-primary p-1.5 rounded-full" />
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold text-foreground">{activeProjects}</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-100 bg-blue-600 p-1.5 rounded-full" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Financials</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
        </TabsList>

        {/* Financials Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expense Trend */}
            <Card className="p-6 bg-card border-border col-span-1 lg:col-span-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">Financial Trends</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorIncomeAnalytics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExpenseAnalytics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                    <Area type="monotone" dataKey="income" stroke="#22c55e" fillOpacity={1} fill="url(#colorIncomeAnalytics)" name="Income" />
                    <Area type="monotone" dataKey="expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenseAnalytics)" name="Expense" />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Expense Breakdown */}
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Expense Breakdown</h2>
              <div className="h-[300px] w-full flex justify-center items-center">
                {expenseCategoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {expenseCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center">
                    <PieChartIcon className="w-12 h-12 mb-2 opacity-20" />
                    <p>No expense data available</p>
                  </div>
                )}
              </div>
            </Card>
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h2>
              <div className="space-y-4">
                {transactions.slice(0, 5).map(t => (
                  <div key={t.id} className="flex justify-between items-center border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{t.description}</p>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    </div>
                    <span className={t.type === 'income' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
                      {t.type === 'income' ? '+' : '-'}${t.amount}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Project Status Distribution</h2>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectStatusData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        {/* Budgets Tab */}
        <TabsContent value="budgets" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Budget vs Spending</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgets} layout="vertical" barGap={2} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <YAxis type="category" dataKey="category" width={100} stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Legend />
                  <Bar dataKey="allocated" name="Allocated Budget" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="spent" name="Actual Spent" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
