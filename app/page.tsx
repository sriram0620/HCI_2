"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TaskList from "./components/TaskList"
import RecentActions from "./components/RecentActions"
import UsabilityMetrics from "./components/UsabilityMetrics"
import GuidedWorkflow from "./components/GuidedWorkflow"
import SmartHistory from "./components/SmartHistory"
import { Tooltip } from "./components/Tooltip"

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [recentActions, setRecentActions] = useState([])
  const [showGuidedWorkflow, setShowGuidedWorkflow] = useState(false)
  const [smartHistory, setSmartHistory] = useState([])

  useEffect(() => {
    // Simulating initial data load
    setTasks([
      { id: 1, title: "Complete project proposal", completed: false, priority: "high" },
      { id: 2, title: "Review team performance", completed: false, priority: "medium" },
      { id: 3, title: "Prepare for client meeting", completed: false, priority: "high" },
    ])
  }, [])

  const addTask = (title, priority) => {
    const newTask = { id: Date.now(), title, completed: false, priority }
    setTasks((prevTasks) => [...prevTasks, newTask])
    addRecentAction(`Added ${priority} priority task: ${title}`)
    updateSmartHistory("add", newTask)
  }

  const toggleTask = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
    const task = tasks.find((t) => t.id === id)
    addRecentAction(`${task.completed ? "Uncompleted" : "Completed"} task: ${task.title}`)
    updateSmartHistory("toggle", task)
  }

  const addRecentAction = (action) => {
    setRecentActions((prev) => [action, ...prev.slice(0, 4)])
  }

  const updateSmartHistory = (action, task) => {
    const newAction = { action, task, timestamp: Date.now() }
    setSmartHistory((prev) => [newAction, ...prev.slice(0, 9)])
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row gap-6"
    >
      <div className="md:w-2/3">
        <Tooltip content="Start a guided tour of the application">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowGuidedWorkflow(true)}
            className="mb-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 ease-in-out"
          >
            Take a Tour
          </motion.button>
        </Tooltip>
        <TaskList tasks={tasks} onToggle={toggleTask} onAdd={addTask} />
      </div>
      <div className="md:w-1/3">
        <RecentActions actions={recentActions} />
        <SmartHistory history={smartHistory} />
        <UsabilityMetrics />
      </div>
      <AnimatePresence>
        {showGuidedWorkflow && <GuidedWorkflow onClose={() => setShowGuidedWorkflow(false)} />}
      </AnimatePresence>
    </motion.div>
  )
}

