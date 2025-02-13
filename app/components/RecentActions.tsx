import { Clock } from "lucide-react"

export default function RecentActions({ actions }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Recent Actions</h2>
      <ul className="space-y-2">
        {actions.map((action, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {action}
          </li>
        ))}
      </ul>
    </div>
  )
}

