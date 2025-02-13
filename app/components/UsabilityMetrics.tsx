"use client"

import { useState, useEffect } from "react"
import { BarChart, Activity, MousePointer, Clock } from "lucide-react"

export default function UsabilityMetrics() {
  const [timeSpent, setTimeSpent] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [mouseMovements, setMouseMovements] = useState(0)
  const [taskCompletionRate, setTaskCompletionRate] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    const clickHandler = () => {
      setClickCount((prev) => prev + 1)
    }

    const mouseMoveHandler = () => {
      setMouseMovements((prev) => prev + 1)
    }

    // Simulating task completion rate
    const taskCompletionTimer = setInterval(() => {
      setTaskCompletionRate(Math.random())
    }, 5000)

    document.addEventListener("click", clickHandler)
    document.addEventListener("mousemove", mouseMoveHandler)

    return () => {
      clearInterval(timer)
      clearInterval(taskCompletionTimer)
      document.removeEventListener("click", clickHandler)
      document.removeEventListener("mousemove", mouseMoveHandler)
    }
  }, [])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Usability Metrics</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Clock className="w-6 h-6 mr-2 text-blue-500" />
          <span>Time spent: {timeSpent} seconds</span>
        </div>
        <div className="flex items-center">
          <MousePointer className="w-6 h-6 mr-2 text-green-500" />
          <span>Click count: {clickCount}</span>
        </div>
        <div className="flex items-center">
          <Activity className="w-6 h-6 mr-2 text-yellow-500" />
          <span>Mouse movements: {mouseMovements}</span>
        </div>
        <div className="flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-purple-500" />
          <span>Task completion rate: {(taskCompletionRate * 100).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  )
}

