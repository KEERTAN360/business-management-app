"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Mail, Lock, User } from "lucide-react"

interface RegisterModalProps {
  onSuccess: (email: string) => void
  onBack: () => void
  onLoginClick: () => void
}

export function RegisterModal({ onSuccess, onBack, onLoginClick }: RegisterModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess(email)
      } else {
        setError(data.message || "Registration failed")
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400 mb-8">Join us to get started</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
              </div>
            </div>

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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-white/40 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-400 mt-6">
            Already have an account?{" "}
            <button
              onClick={onLoginClick}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
