"use client"

import { Check } from "lucide-react"

interface PlansPageProps {
  onSelectPlan: () => void
  onLicenseKeyClick: () => void
}

export function PlansPage({ onSelectPlan, onLicenseKeyClick }: PlansPageProps) {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Perfect for small teams",
      features: ["Up to 5 team members", "Basic analytics", "Employee tracking", "Progress tracking", "Email support"],
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Up to 50 team members",
        "Advanced analytics",
        "All Basic features",
        "Event planning",
        "Finance tracking",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations",
      features: [
        "Unlimited team members",
        "Custom integrations",
        "All Pro features",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom training",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-xl text-slate-400">Select the perfect plan for your business needs</p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative backdrop-blur-xl rounded-2xl p-8 transition-all ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-cyan-400/50 shadow-2xl scale-105"
                  : "bg-white/10 border border-white/20 hover:border-white/40"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-400 ml-2">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check size={20} className="text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={onSelectPlan}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                    : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* License Key Option */}
        <div className="text-center">
          <p className="text-slate-400 mb-4">Have a license key?</p>
          <button
            onClick={onLicenseKeyClick}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold transition-all"
          >
            Use License Key
          </button>
        </div>
      </div>
    </div>
  )
}
