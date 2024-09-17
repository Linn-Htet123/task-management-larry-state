import { Task } from "@/types/task";
import { createStore } from "larry-state";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[] | ((prev: Task[]) => Task[])) => void;
};

const useTaskStore = (): TaskStore => {
  const { value: tasks, updateValue: setTasks } = createStore<Task[]>({
    name: "tasks",
    defaultValue: [],
    isPersist: true,
  });

  return { tasks, setTasks };
};

export default useTaskStore;
