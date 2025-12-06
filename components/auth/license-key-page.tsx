"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Key } from "lucide-react"

interface LicenseKeyPageProps {
  onSuccess: () => void
  onBack: () => void
}

export function LicenseKeyPage({ onSuccess, onBack }: LicenseKeyPageProps) {
  const [licenseKey, setLicenseKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!licenseKey.trim()) {
      setError("Please enter a valid license key")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Simulate validation
    if (licenseKey.length < 10) {
      setError("Invalid license key format")
      return
    }

    onSuccess()
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
          <h1 className="text-3xl font-bold text-white mb-2">Activate License Key</h1>
          <p className="text-slate-400 mb-8">Enter your license key to activate your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* License Key Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">License Key</label>
              <div className="relative">
                <Key size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-white/40 transition-colors font-mono"
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
              {isLoading ? "Validating..." : "Activate License"}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-200">Don't have a license key? Go back and choose a plan to get started.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
