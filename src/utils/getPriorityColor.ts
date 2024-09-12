import { Priority } from "@/types/task";

const getPriorityClasses = (priority: Priority) => {
  switch (priority) {
    case "Low":
      return {
        bg: "bg-green-200",
        text: "text-green-800",
      };
    case "Medium":
      return {
        bg: "bg-yellow-200",
        text: "text-yellow-800",
      };
    case "High":
      return {
        bg: "bg-orange-200",
        text: "text-orange-800",
      };
    case "Critical":
      return {
        bg: "bg-red-200",
        text: "text-red-800",
      };
    case "Urgent":
      return {
        bg: "bg-purple-200",
        text: "text-purple-800",
      };
    case "Important":
      return {
        bg: "bg-blue-200",
        text: "text-blue-800",
      };
    case "Routine":
      return {
        bg: "bg-gray-200",
        text: "text-gray-800",
      };
    case "Deferred":
      return {
        bg: "bg-teal-200",
        text: "text-teal-800",
      };
    default:
      return {
        bg: "bg-gray-200",
        text: "text-gray-800",
      };
  }
};

export default getPriorityClasses;
