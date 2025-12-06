"use client"

import { ArrowLeft } from "lucide-react"

interface AboutPageProps {
  onBack: () => void
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-bold text-white mb-8">About BusinessHub</h1>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              BusinessHub is dedicated to empowering organizations of all sizes with comprehensive tools to automate and
              optimize their business operations. We believe that every business deserves access to enterprise-grade
              management solutions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
            <ul className="space-y-3 text-lg">
              <li>• Advanced analytics and data insights</li>
              <li>• Employee efficiency tracking and management</li>
              <li>• Project progress monitoring</li>
              <li>• Event planning and coordination</li>
              <li>• Financial tracking and budget optimization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-lg leading-relaxed">
              With our intuitive interface and powerful features, you can manage your entire business from one unified
              platform. Our team is committed to providing exceptional support and continuous innovation to help your
              business thrive.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
