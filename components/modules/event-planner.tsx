"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Calendar, Users, MapPin, Clock, Edit2, AlertCircle, CheckCircle2 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Attendee {
  id: string
  name: string
  status: "confirmed" | "pending" | "declined"
}

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  attendees: Attendee[]
  type: "Meeting" | "Launch" | "Training" | "Presentation" | "Conference" | "Workshop"
  description: string
  status: "upcoming" | "ongoing" | "completed"
  budget: number
  organizer: string
}

const initialEvents: Event[] = [
  {
    id: "1",
    name: "Team Meeting",
    date: "2025-01-25",
    time: "10:00 AM",
    location: "Conference Room A",
    attendees: [
      { id: "a1", name: "John Doe", status: "confirmed" },
      { id: "a2", name: "Jane Smith", status: "confirmed" },
      { id: "a3", name: "Bob Johnson", status: "pending" },
      { id: "a4", name: "Alice Brown", status: "confirmed" },
      { id: "a5", name: "Charlie Wilson", status: "declined" },
      { id: "a6", name: "Diana Lee", status: "confirmed" },
      { id: "a7", name: "Eve Martinez", status: "confirmed" },
      { id: "a8", name: "Frank Garcia", status: "confirmed" },
      { id: "a9", name: "Grace Taylor", status: "confirmed" },
      { id: "a10", name: "Henry Anderson", status: "pending" },
      { id: "a11", name: "Iris Thomas", status: "confirmed" },
      { id: "a12", name: "Jack White", status: "confirmed" },
    ],
    type: "Meeting",
    description: "Quarterly business review and planning session",
    status: "upcoming",
    budget: 500,
    organizer: "Sarah Johnson",
  },
  {
    id: "2",
    name: "Product Launch",
    date: "2025-02-01",
    time: "2:00 PM",
    location: "Main Hall",
    attendees: Array.from({ length: 150 }, (_, i) => ({
      id: `b${i}`,
      name: `Attendee ${i + 1}`,
      status: i % 3 === 0 ? "pending" : i % 5 === 0 ? "declined" : "confirmed",
    })),
    type: "Launch",
    description: "Launch of new product line with media coverage",
    status: "upcoming",
    budget: 25000,
    organizer: "Marketing Team",
  },
  {
    id: "3",
    name: "Training Session",
    date: "2025-01-28",
    time: "9:00 AM",
    location: "Training Center",
    attendees: Array.from({ length: 25 }, (_, i) => ({
      id: `c${i}`,
      name: `Trainee ${i + 1}`,
      status: i % 4 === 0 ? "pending" : "confirmed",
    })),
    type: "Training",
    description: "Professional development training for new software",
    status: "upcoming",
    budget: 3000,
    organizer: "HR Department",
  },
  {
    id: "4",
    name: "Client Presentation",
    date: "2025-02-05",
    time: "3:00 PM",
    location: "Virtual",
    attendees: [
      { id: "d1", name: "Client Rep 1", status: "confirmed" },
      { id: "d2", name: "Client Rep 2", status: "confirmed" },
      { id: "d3", name: "Our Sales Lead", status: "confirmed" },
      { id: "d4", name: "Our Product Manager", status: "confirmed" },
      { id: "d5", name: "Our Engineer", status: "confirmed" },
      { id: "d6", name: "Our Designer", status: "pending" },
      { id: "d7", name: "Client Manager", status: "confirmed" },
      { id: "d8", name: "Client Director", status: "confirmed" },
    ],
    type: "Presentation",
    description: "Q1 product roadmap and feature showcase",
    status: "upcoming",
    budget: 1000,
    organizer: "Sales Team",
  },
]

const eventTypeData = [
  { type: "Meeting", count: 1, attendees: 12 },
  { type: "Launch", count: 1, attendees: 150 },
  { type: "Training", count: 1, attendees: 25 },
  { type: "Presentation", count: 1, attendees: 8 },
]

const attendanceData = [
  { event: "Team Meeting", confirmed: 10, pending: 1, declined: 1 },
  { event: "Product Launch", confirmed: 120, pending: 20, declined: 10 },
  { event: "Training", confirmed: 22, pending: 2, declined: 1 },
  { event: "Presentation", confirmed: 6, pending: 1, declined: 1 },
]

export function EventPlanner() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [filterType, setFilterType] = useState<"all" | Event["type"]>("all")

  const removeEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Meeting":
        return "bg-blue-100 text-blue-800"
      case "Launch":
        return "bg-purple-100 text-purple-800"
      case "Training":
        return "bg-green-100 text-green-800"
      case "Presentation":
        return "bg-orange-100 text-orange-800"
      case "Conference":
        return "bg-pink-100 text-pink-800"
      case "Workshop":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600"
      case "pending":
        return "text-yellow-600"
      case "declined":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredEvents = filterType === "all" ? events : events.filter((e) => e.type === filterType)

  const totalAttendees = events.reduce((sum, e) => sum + e.attendees.length, 0)
  const confirmedAttendees = events.reduce(
    (sum, e) => sum + e.attendees.filter((a) => a.status === "confirmed").length,
    0,
  )
  const totalBudget = events.reduce((sum, e) => sum + e.budget, 0)

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Event Planner</h1>
          <p className="text-muted-foreground">Plan and manage your business events.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Events</p>
          <p className="text-3xl font-bold text-foreground">{events.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Planned events</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Attendees</p>
          <p className="text-3xl font-bold text-foreground">{totalAttendees}</p>
          <p className="text-xs text-green-600 mt-2">{confirmedAttendees} confirmed</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Budget</p>
          <p className="text-3xl font-bold text-foreground">${totalBudget.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">Allocated</p>
        </Card>
        <Card className="p-6 bg-card border-border">
          <p className="text-sm text-muted-foreground mb-2">Confirmation Rate</p>
          <p className="text-3xl font-bold text-foreground">
            {((confirmedAttendees / totalAttendees) * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-2">Overall</p>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="flex gap-2 mb-4">
            {["all", "Meeting", "Launch", "Training", "Presentation"].map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(type as any)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="p-6 bg-card border-border">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{event.name}</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEvent(event.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees.length} attendees</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Organizer:</span>
                    <span className="font-medium text-foreground">{event.organizer}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium text-foreground">${event.budget.toLocaleString()}</span>
                  </div>
                </div>

                {/* Attendance Summary */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">ATTENDANCE</p>
                  <div className="flex gap-2">
                    <div className="flex-1 text-center">
                      <p className="text-lg font-bold text-green-600">
                        {event.attendees.filter((a) => a.status === "confirmed").length}
                      </p>
                      <p className="text-xs text-muted-foreground">Confirmed</p>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-lg font-bold text-yellow-600">
                        {event.attendees.filter((a) => a.status === "pending").length}
                      </p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-lg font-bold text-red-600">
                        {event.attendees.filter((a) => a.status === "declined").length}
                      </p>
                      <p className="text-xs text-muted-foreground">Declined</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Event Timeline</h2>
            <div className="space-y-4">
              {events
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((event) => (
                  <div key={event.id} className="flex gap-4 items-start pb-4 border-b border-border last:border-b-0">
                    <div className="w-24 flex-shrink-0">
                      <p className="text-sm font-semibold text-foreground">{event.date}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{event.name}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTypeColor(event.type)}`}
                        >
                          {event.type}
                        </span>
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-muted text-foreground">
                          {event.attendees.length} attendees
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Events by Type</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eventTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" dataKey="type" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip />
                  <Bar dataKey="count" fill="var(--chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Attendees by Event</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eventTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis stroke="var(--muted-foreground)" dataKey="type" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip />
                  <Bar dataKey="attendees" fill="var(--chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Budget Allocation</h2>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-foreground">{event.name}</div>
                  <div className="flex-1">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(event.budget / totalBudget) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm font-semibold text-foreground">
                    ${event.budget.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Attendance Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis stroke="var(--muted-foreground)" dataKey="event" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip />
                <Legend />
                <Bar dataKey="confirmed" fill="var(--chart-1)" />
                <Bar dataKey="pending" fill="var(--chart-2)" />
                <Bar dataKey="declined" fill="var(--chart-4)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">{event.name}</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {event.attendees.map((attendee) => (
                    <div key={attendee.id} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm text-foreground">{attendee.name}</span>
                      <div className="flex items-center gap-2">
                        {attendee.status === "confirmed" && (
                          <CheckCircle2 className={`w-4 h-4 ${getStatusColor(attendee.status)}`} />
                        )}
                        {attendee.status === "pending" && (
                          <AlertCircle className={`w-4 h-4 ${getStatusColor(attendee.status)}`} />
                        )}
                        {attendee.status === "declined" && (
                          <AlertCircle className={`w-4 h-4 ${getStatusColor(attendee.status)}`} />
                        )}
                        <span className={`text-xs font-semibold capitalize ${getStatusColor(attendee.status)}`}>
                          {attendee.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
