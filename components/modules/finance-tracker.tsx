"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Edit2 } from "lucide-react"
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

interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  status: "completed" | "pending"
}

interface BudgetItem {
  name: string
  allocated: number
  spent: number
  fill: string
  category: string
}

interface Invoice {
  id: string
  number: string
  client: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue"
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    description: "Client Payment - Project A",
    amount: 5000,
    type: "income",
    category: "Revenue",
    date: "2025-01-20",
    status: "completed",
  },
  {
    id: "2",
    description: "Office Supplies",
    amount: 250,
    type: "expense",
    category: "Operations",
    date: "2025-01-19",
    status: "completed",
  },
  {
    id: "3",
    description: "Salary Payments",
    amount: 15000,
    type: "expense",
    category: "Payroll",
    date: "2025-01-15",
    status: "completed",
  },
  {
    id: "4",
    description: "Software License",
    amount: 500,
    type: "expense",
    category: "Technology",
    date: "2025-01-18",
    status: "completed",
  },
  {
    id: "5",
    description: "Marketing Campaign",
    amount: 2000,
    type: "expense",
    category: "Marketing",
    date: "2025-01-17",
    status: "pending",
  },
  {
    id: "6",
    description: "Consulting Services",
    amount: 3500,
    type: "income",
    category: "Revenue",
    date: "2025-01-16",
    status: "completed",
  },
]

const budgetData: BudgetItem[] = [
  { name: "Payroll", allocated: 50000, spent: 45000, fill: "#3b82f6", category: "Payroll" },
  { name: "Operations", allocated: 15000, spent: 12000, fill: "#60a5fa", category: "Operations" },
  { name: "Technology", allocated: 10000, spent: 8500, fill: "#93c5fd", category: "Technology" },
  { name: "Marketing", allocated: 8000, spent: 6200, fill: "#bfdbfe", category: "Marketing" },
]

const monthlyData = [
  { month: "Jan", income: 15000, expenses: 12000, profit: 3000 },
  { month: "Feb", income: 18000, expenses: 14000, profit: 4000 },
  { month: "Mar", income: 16000, expenses: 13000, profit: 3000 },
  { month: "Apr", income: 20000, expenses: 15000, profit: 5000 },
  { month: "May", income: 22000, expenses: 16000, profit: 6000 },
  { month: "Jun", income: 19000, expenses: 14500, profit: 4500 },
]

const invoices: Invoice[] = [
  { id: "inv1", number: "INV-001", client: "Acme Corp", amount: 5000, dueDate: "2025-02-15", status: "paid" },
  { id: "inv2", number: "INV-002", client: "Tech Solutions", amount: 3500, dueDate: "2025-02-20", status: "pending" },
  {
    id: "inv3",
    number: "INV-003",
    client: "Global Industries",
    amount: 7500,
    dueDate: "2025-02-10",
    status: "overdue",
  },
  { id: "inv4", number: "INV-004", client: "StartUp Inc", amount: 2500, dueDate: "2025-02-25", status: "pending" },
]

const categoryBreakdown = [
  { category: "Payroll", percentage: 60, amount: 45000 },
  { category: "Operations", percentage: 16, amount: 12000 },
  { category: "Technology", percentage: 11, amount: 8500 },
  { category: "Marketing", percentage: 8, amount: 6200 },
  { category: "Other", percentage: 5, amount: 3800 },
]

export function FinanceTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses
  const totalBudgetAllocated = budgetData.reduce((sum, b) => sum + b.allocated, 0)
  const totalBudgetSpent = budgetData.reduce((sum, b) => sum + b.spent, 0)
  const budgetRemaining = totalBudgetAllocated - totalBudgetSpent

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const filteredTransactions =
    filterCategory === "all" ? transactions : transactions.filter((t) => t.category === filterCategory)

  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Finance & Budget Tracker</h1>
          <p className="text-muted-foreground">Manage finances and optimize your budget.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Income</p>
              <p className="text-3xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
          </div>
          <p className="text-xs text-green-600 mt-2">+12% from last month</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Expenses</p>
              <p className="text-3xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600 opacity-20" />
          </div>
          <p className="text-xs text-red-600 mt-2">+8% from last month</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Balance</p>
          <p className={`text-3xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${balance.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Net profit</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Budget Spent</p>
          <p className="text-3xl font-bold text-foreground">${totalBudgetSpent.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {((totalBudgetSpent / totalBudgetAllocated) * 100).toFixed(0)}% of budget
          </p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Budget Remaining</p>
          <p className="text-3xl font-bold text-blue-600">${budgetRemaining.toLocaleString()}</p>
          <p className="text-xs text-blue-600 mt-2">Available</p>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" dataKey="month" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="var(--chart-1)" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="var(--chart-2)" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="var(--chart-3)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Budget Allocation</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="allocated"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Income vs Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="month" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="var(--chart-1)" />
                <Bar dataKey="expenses" fill="var(--chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgetData.map((budget) => (
              <Card key={budget.name} className="p-6 bg-card border-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{budget.name}</h3>
                    <p className="text-sm text-muted-foreground">Budget Category</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Allocated</span>
                    <span className="font-semibold text-foreground">${budget.allocated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spent</span>
                    <span className="font-semibold text-foreground">${budget.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-semibold text-green-600">
                      ${(budget.allocated - budget.spent).toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                        style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {((budget.spent / budget.allocated) * 100).toFixed(0)}% spent
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Budget vs Actual</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="name" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="allocated" fill="var(--chart-1)" />
                <Bar dataKey="spent" fill="var(--chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="flex gap-2 mb-4">
            <Button
              variant={filterCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("all")}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filterCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <Card className="bg-card border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Transactions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground">{transaction.description}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.category}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={
                            transaction.type === "income"
                              ? "text-green-600 font-semibold"
                              : "text-red-600 font-semibold"
                          }
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-1">
                          {transaction.status === "completed" ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          )}
                          <span
                            className={
                              transaction.status === "completed"
                                ? "text-green-600 capitalize"
                                : "text-yellow-600 capitalize"
                            }
                          >
                            {transaction.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTransaction(transaction.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {invoices.map((invoice) => (
              <Card key={invoice.id} className="p-6 bg-card border-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{invoice.number}</h3>
                    <p className="text-sm text-muted-foreground">{invoice.client}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-semibold text-foreground">${invoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date</span>
                    <span className="font-semibold text-foreground">{invoice.dueDate}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Expense Breakdown by Category</h2>
            <div className="space-y-4">
              {categoryBreakdown.map((cat) => (
                <div key={cat.category} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-foreground">{cat.category}</div>
                  <div className="flex-1">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <p className="text-sm font-semibold text-foreground">{cat.percentage}%</p>
                    <p className="text-xs text-muted-foreground">${cat.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Financial Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded">
                <p className="text-sm text-muted-foreground mb-1">Total Income (6 months)</p>
                <p className="text-2xl font-bold text-green-600">$110,000</p>
              </div>
              <div className="p-4 bg-muted rounded">
                <p className="text-sm text-muted-foreground mb-1">Total Expenses (6 months)</p>
                <p className="text-2xl font-bold text-red-600">$84,500</p>
              </div>
              <div className="p-4 bg-muted rounded">
                <p className="text-sm text-muted-foreground mb-1">Net Profit (6 months)</p>
                <p className="text-2xl font-bold text-blue-600">$25,500</p>
              </div>
              <div className="p-4 bg-muted rounded">
                <p className="text-sm text-muted-foreground mb-1">Profit Margin</p>
                <p className="text-2xl font-bold text-foreground">23.2%</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
