import { Priority } from "@/types/task";

const getPriorityClasses = (priority: Priority) => {
  switch (priority) {
    case "Low":
      return {
        border: "border-green-200",
        text: "text-green-800",
      };
    case "Medium":
      return {
        border: "border-yellow-200",
        text: "text-yellow-800",
      };
    case "High":
      return {
        border: "border-orange-200",
        text: "text-orange-800",
      };
    case "Critical":
      return {
        border: "border-red-200",
        text: "text-red-800",
      };
    case "Urgent":
      return {
        border: "border-purple-200",
        text: "text-purple-800",
      };
    case "Important":
      return {
        border: "border-blue-200",
        text: "text-blue-800",
      };
    case "Routine":
      return {
        border: "border-gray-200",
        text: "text-gray-800",
      };
    case "Deferred":
      return {
        border: "border-teal-200",
        text: "text-teal-800",
      };
    default:
      return {
        border: "border-gray-200",
        text: "text-gray-800",
      };
  }
};

export default getPriorityClasses;
