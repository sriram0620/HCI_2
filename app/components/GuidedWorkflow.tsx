"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const steps = [
  {
    title: "Welcome",
    content: "Welcome to our task management app! Let's take a quick tour of its features.",
  },
  {
    title: "Adding Tasks",
    content:
      "To add a new task, use the input field at the top of the task list. You can also set the priority of the task.",
  },
  {
    title: "Managing Tasks",
    content:
      "Click on a task to mark it as complete or incomplete. Tasks are sorted by priority to help you focus on what's important.",
  },
  {
    title: "Recent Actions",
    content: "The Recent Actions panel shows your latest activities, helping you keep track of your progress.",
  },
  {
    title: "Smart History",
    content: "The Smart History feature provides a more detailed view of your task management history.",
  },
  {
    title: "Usability Metrics",
    content:
      "We track usability metrics to help us improve your experience. You can see some of these metrics at the bottom of the sidebar.",
  },
]

export default function GuidedWorkflow({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            {steps[currentStep].content}
          </motion.p>
        </AnimatePresence>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

