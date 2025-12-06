"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Mail, Lock } from "lucide-react"

interface LoginModalProps {
  onSuccess: () => void
  onBack: () => void
  onRegisterClick: () => void
}

export function LoginModal({ onSuccess, onBack, onRegisterClick }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess()
      } else {
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 mb-8">Sign in to your account</p>

          <div className="mb-4 text-red-400 text-sm text-center min-h-[20px]">{error}</div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-slate-400 mt-6">
            Don't have an account?{" "}
            <button
              onClick={onRegisterClick}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
