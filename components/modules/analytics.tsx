"use client"

import { useState } from "react"
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
  ScatterChart,
  Scatter,
} from "recharts"
import { TrendingUp, TrendingDown, Filter } from "lucide-react"

const analyticsData = [
  { date: "2025-01-01", pageViews: 2400, users: 1200, conversions: 240, bounce: 45 },
  { date: "2025-01-02", pageViews: 1398, users: 1221, conversions: 221, bounce: 52 },
  { date: "2025-01-03", pageViews: 9800, users: 2290, conversions: 229, bounce: 38 },
  { date: "2025-01-04", pageViews: 3908, users: 2000, conversions: 200, bounce: 48 },
  { date: "2025-01-05", pageViews: 4800, users: 2181, conversions: 500, bounce: 35 },
  { date: "2025-01-06", pageViews: 3800, users: 2500, conversions: 250, bounce: 42 },
]

const sourceData = [
  { source: "Organic", users: 4200, revenue: 12600 },
  { source: "Direct", users: 3100, revenue: 9300 },
  { source: "Referral", users: 2800, revenue: 8400 },
  { source: "Social", users: 2200, revenue: 6600 },
  { source: "Paid", users: 1900, revenue: 5700 },
]

const deviceData = [
  { device: "Desktop", percentage: 55, users: 6270 },
  { device: "Mobile", percentage: 35, users: 3990 },
  { device: "Tablet", percentage: 10, users: 1140 },
]

export function Analytics() {
  const [timeRange, setTimeRange] = useState("week")
  const [selectedMetric, setSelectedMetric] = useState("all")

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Analytics & Data Analysis</h1>
          <p className="text-muted-foreground">Track and analyze your business metrics in real-time.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {["day", "week", "month", "year"].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range)}
            className="capitalize"
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Page Views</p>
              <p className="text-3xl font-bold text-foreground">26,706</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">+15.3% increase</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Unique Users</p>
              <p className="text-3xl font-bold text-foreground">11,391</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">+8.2% increase</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
              <p className="text-3xl font-bold text-foreground">3.2%</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">+0.5% increase</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Avg. Bounce Rate</p>
              <p className="text-3xl font-bold text-foreground">42.4%</p>
            </div>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs text-green-600 mt-2">-2.1% decrease</p>
        </Card>
      </div>

      {/* Tabs for different analysis views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
          <TabsTrigger value="devices">Device Analysis</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Page Views Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="date" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Area type="monotone" dataKey="pageViews" fill="var(--chart-1)" stroke="var(--chart-1)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Key Metrics Comparison</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="date" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pageViews" stroke="var(--chart-1)" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="var(--chart-2)" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="var(--chart-3)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Traffic Sources Tab */}
        <TabsContent value="sources" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Traffic by Source</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="source" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="var(--chart-1)" />
                <Bar dataKey="revenue" fill="var(--chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sourceData.map((source) => (
              <Card key={source.source} className="p-4 bg-card border-border">
                <p className="text-sm text-muted-foreground mb-2">{source.source}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{source.users}</p>
                    <p className="text-xs text-muted-foreground">users</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">${source.revenue}</p>
                    <p className="text-xs text-muted-foreground">revenue</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Device Analysis Tab */}
        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deviceData.map((device) => (
              <Card key={device.device} className="p-6 bg-card border-border">
                <p className="text-sm text-muted-foreground mb-2">{device.device}</p>
                <p className="text-3xl font-bold text-foreground">{device.percentage}%</p>
                <p className="text-xs text-muted-foreground mt-2">{device.users} users</p>
                <div className="mt-4 w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${device.percentage}%` }} />
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Device Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="device" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Bar dataKey="users" fill="var(--chart-1)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Bounce Rate Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="date" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Line type="monotone" dataKey="bounce" stroke="var(--chart-4)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Conversion Correlation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="users" />
                <YAxis stroke="var(--muted-foreground)" dataKey="conversions" />
                <Tooltip />
                <Scatter dataKey="conversions" fill="var(--chart-1)" />
              </ScatterChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
