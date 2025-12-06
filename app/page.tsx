"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { Analytics } from "@/components/modules/analytics"
import { EmployeeTracker } from "@/components/modules/employee-tracker"
import { ProgressTracker } from "@/components/modules/progress-tracker"
import { EventPlanner } from "@/components/modules/event-planner"
import { FinanceTracker } from "@/components/modules/finance-tracker"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeModule, setActiveModule] = useState("dashboard")
  const router = useRouter()

  const handleLogin = () => {
    setIsAuthenticated(true)
    setActiveModule("dashboard")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setActiveModule("dashboard")
  }

  if (!isAuthenticated) {
    return <LandingPage onLogin={handleLogin} />
  }

  const renderModule = () => {
    switch (activeModule) {
      case "analytics":
        return <Analytics />
      case "employees":
        return <EmployeeTracker />
      case "progress":
        return <ProgressTracker />
      case "events":
        return <EventPlanner />
      case "finance":
        return <FinanceTracker />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} onLogout={handleLogout} />
      <main className="flex-1 overflow-auto">{renderModule()}</main>
    </div>
  )
}
