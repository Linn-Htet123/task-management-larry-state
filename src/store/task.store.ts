import { Task } from "@/types/task";
import { createStore } from "larry-state";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void;
};

const useTaskStore = (): TaskStore => {
  const { value: tasks, updateValue: setTasks } = createStore<Task[]>({
    name: "tasks",
    defaultValue: [
      {
        id: 4,
        laneId: 1,
        title: "Create API service for frontend.",
        description: "3 api route need create.",
        status: "Frontend",
        tags: ["API"],
        priority: "Urgent",
        estimate: "4h",
      },
      {
        id: 6,
        laneId: 1,
        title: "What does the fox say",
        description: "3 api route need create.",
        status: "Frontend",
        tags: ["API"],
        priority: "High",
        estimate: "4h",
      },
      {
        id: 5,
        laneId: 2,
        title: "Create controller and service backend.",
        description: "4 api route need create.",
        status: "Backend",
        tags: ["Backend", "API"],
        priority: "Low",
        estimate: "4h",
      },
    ],
    isPersist: true,
  });

  return { tasks, setTasks };
};

export default useTaskStore;
