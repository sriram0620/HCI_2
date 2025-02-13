"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, CheckCircle, Circle, AlertTriangle, AlertCircle } from "lucide-react"
import { Tooltip } from "./Tooltip"

export default function TaskList({ tasks, onToggle, onAdd }) {
  const [newTask, setNewTask] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState("medium")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      onAdd(newTask.trim(), newTaskPriority)
      setNewTask("")
      setNewTaskPriority("medium")
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return null
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="p-2 border-t border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <Tooltip content="Add a new task">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <PlusCircle className="w-6 h-6" />
            </motion.button>
          </Tooltip>
        </div>
      </form>
      <AnimatePresence>
        {sortedTasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer mb-2"
            onClick={() => onToggle(task.id)}
          >
            <Tooltip content={task.completed ? "Mark as incomplete" : "Mark as complete"}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {task.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 mr-2" />
                )}
              </motion.div>
            </Tooltip>
            <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
            <Tooltip content={`Priority: ${task.priority}`}>
              <motion.span className="ml-auto" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {getPriorityIcon(task.priority)}
              </motion.span>
            </Tooltip>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

