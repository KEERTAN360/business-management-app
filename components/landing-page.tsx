"use client"

import { useState } from "react"
import { GlassNavbar } from "@/components/glass-navbar"
import { LoginModal } from "@/components/auth/login-modal"
import { RegisterModal } from "@/components/auth/register-modal"
import { PlansPage } from "@/components/auth/plans-page"
import { LicenseKeyPage } from "@/components/auth/license-key-page"
import { AboutPage } from "@/components/pages/about-page"
import { BlogsPage } from "@/components/pages/blogs-page"

type PageView = "landing" | "login" | "register" | "plans" | "license" | "about" | "blogs"

interface LandingPageProps {
  onLogin: () => void
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [currentPage, setCurrentPage] = useState<PageView>("landing")
  const [userEmail, setUserEmail] = useState("")

  const handleLoginSuccess = () => {
    onLogin()
  }

  const handleRegisterSuccess = (email: string) => {
    setUserEmail(email)
    setCurrentPage("plans")
  }

  const handlePlanSelect = () => {
    onLogin()
  }

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <LoginModal
            onSuccess={handleLoginSuccess}
            onBack={() => setCurrentPage("landing")}
            onRegisterClick={() => setCurrentPage("register")}
          />
        )
      case "register":
        return (
          <RegisterModal
            onSuccess={handleRegisterSuccess}
            onBack={() => setCurrentPage("landing")}
            onLoginClick={() => setCurrentPage("login")}
          />
        )
      case "plans":
        return <PlansPage onSelectPlan={handlePlanSelect} onLicenseKeyClick={() => setCurrentPage("license")} />
      case "license":
        return <LicenseKeyPage onSuccess={onLogin} onBack={() => setCurrentPage("plans")} />
      case "about":
        return <AboutPage onBack={() => setCurrentPage("landing")} />
      case "blogs":
        return <BlogsPage onBack={() => setCurrentPage("landing")} />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <GlassNavbar
              onAboutClick={() => setCurrentPage("about")}
              onBlogsClick={() => setCurrentPage("blogs")}
              onLoginClick={() => setCurrentPage("login")}
            />
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
              <div className="text-center px-4 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">Automate Your Business</h1>
                <p className="text-xl text-slate-300 mb-8 text-balance">
                  Complete business management suite with analytics, employee tracking, project management, event
                  planning, and financial controls.
                </p>
                <button
                  onClick={() => setCurrentPage("login")}
                  className="px-8 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-slate-100 transition-colors"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )
    }
  }

  return renderPage()
}
