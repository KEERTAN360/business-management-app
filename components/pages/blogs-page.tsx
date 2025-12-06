"use client"

import { ArrowLeft } from "lucide-react"

interface BlogsPageProps {
  onBack: () => void
}

export function BlogsPage({ onBack }: BlogsPageProps) {
  const blogs = [
    {
      title: "Getting Started with BusinessHub",
      excerpt: "Learn how to set up your account and start managing your business efficiently.",
      date: "Oct 20, 2024",
      category: "Getting Started",
    },
    {
      title: "Maximizing Employee Productivity",
      excerpt: "Tips and tricks for using our employee tracking features to boost team performance.",
      date: "Oct 18, 2024",
      category: "Best Practices",
    },
    {
      title: "Financial Planning for Growth",
      excerpt: "How to use our finance tracker to plan and optimize your business budget.",
      date: "Oct 15, 2024",
      category: "Finance",
    },
    {
      title: "Event Planning Made Easy",
      excerpt: "Discover how to organize and manage business events with our planning tools.",
      date: "Oct 12, 2024",
      category: "Events",
    },
  ]

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
        <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
        <p className="text-xl text-slate-400 mb-12">Tips, insights, and updates from the BusinessHub team</p>

        {/* Blog Grid */}
        <div className="grid gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.title}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium mb-3">
                    {blog.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2">{blog.title}</h2>
                </div>
              </div>
              <p className="text-slate-300 mb-4">{blog.excerpt}</p>
              <p className="text-sm text-slate-500">{blog.date}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
