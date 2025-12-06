"use client"

import {
  BarChart3,
  Users,
  CheckSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
  onLogout: () => void
}

export function Sidebar({ activeModule, setActiveModule, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isHoveringTab, setIsHoveringTab] = useState(false)

  const modules = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "employees", label: "Employees", icon: Users },
    { id: "progress", label: "Progress", icon: CheckSquare },
    { id: "events", label: "Events", icon: Calendar },
    { id: "finance", label: "Finance", icon: DollarSign },
  ]

  const handleHelp = () => {
    console.log("Opening help...")
    // Add help logic here
  }

  return (
    <div className="relative">
      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6 border-b border-sidebar-border">
          {isOpen && (
            <>
              <h1 className="text-2xl font-bold text-sidebar-foreground">BusinessHub</h1>
              <p className="text-sm text-sidebar-foreground/60">Management Suite</p>
            </>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {modules.map((module) => {
            const Icon = module.icon
            const isActive = activeModule === module.id
            return (
              <Button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 transition-all duration-300 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                } ${!isOpen && "justify-center"}`}
                title={!isOpen ? module.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span>{module.label}</span>}
              </Button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            onClick={handleHelp}
            variant="ghost"
            className={`w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-300 ${
              !isOpen && "justify-center"
            }`}
            title={!isOpen ? "Help" : ""}
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>Help</span>}
          </Button>

          <Button
            onClick={onLogout}
            variant="ghost"
            className={`w-full justify-start gap-3 text-red-500 hover:bg-red-500/10 transition-all duration-300 ${
              !isOpen && "justify-center"
            }`}
            title={!isOpen ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>Logout</span>}
          </Button>

          {isOpen && (
            <div className="text-xs text-sidebar-foreground/60 space-y-1 pt-2">
              <p>© 2025 BusinessHub</p>
              <p>v1.0.0</p>
            </div>
          )}
        </div>
      </aside>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 z-50 transition-all duration-300 flex items-center justify-center group"
        style={{
          left: isOpen ? "calc(256px - 24px)" : "calc(80px - 24px)",
          width: "48px",
          height: "48px",
          background: isHoveringTab
            ? "linear-gradient(135deg, rgb(79, 172, 254) 0%, rgb(59, 130, 246) 100%)"
            : "linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)",
          backdropFilter: "blur(12px)",
          borderTop: isHoveringTab ? "2px solid rgba(255, 255, 255, 0.5)" : "2px solid rgba(255, 255, 255, 0.3)",
          borderRight: isHoveringTab ? "2px solid rgba(255, 255, 255, 0.5)" : "2px solid rgba(255, 255, 255, 0.3)",
          borderBottom: isHoveringTab ? "2px solid rgba(255, 255, 255, 0.5)" : "2px solid rgba(255, 255, 255, 0.3)",
          borderLeft: "none",
          boxShadow: isHoveringTab
            ? "0 12px 48px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            : "0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          cursor: "pointer",
          borderRadius: "0 24px 24px 0",
          transform: isHoveringTab ? "scale(1.08) translateX(2px)" : "scale(1)",
        }}
        onMouseEnter={() => setIsHoveringTab(true)}
        onMouseLeave={() => setIsHoveringTab(false)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <ChevronLeft className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
        ) : (
          <ChevronRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-x-0.5" />
        )}
      </button>

      <div className={`transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`} />
    </div>
  )
}
