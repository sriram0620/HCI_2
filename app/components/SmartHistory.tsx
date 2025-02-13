import { Clock, Repeat, PlusCircle } from "lucide-react"

export default function SmartHistory({ history }) {
  const getActionIcon = (action) => {
    switch (action) {
      case "add":
        return <PlusCircle className="w-4 h-4 mr-2" />
      case "toggle":
        return <Repeat className="w-4 h-4 mr-2" />
      default:
        return null
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Smart History</h2>
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            {getActionIcon(item.action)}
            <Clock className="w-4 h-4 mr-2" />
            <span>
              {item.action === "add" ? "Added" : "Toggled"} task: {item.task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

