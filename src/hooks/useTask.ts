import { Task } from "@/types/task";
import useTaskStore from "@/store/task.store";

const updateTaskRecursively = (tasks: Task[], updatedTask: Task): Task[] => {
    return tasks.map(task => {
        if (task.id === updatedTask.id) {
            return updatedTask;
        }

        if (task.subtasks && task.subtasks.length > 0) {
            return {
                ...task,
                subtasks: updateTaskRecursively(task.subtasks, updatedTask),
            };
        }

        return task;
    });
};

const useTask = () => {
    const { tasks, setTasks } = useTaskStore();

    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) => updateTaskRecursively(prevTasks, updatedTask));
    };

    return { tasks, updateTask };
};

export default useTask;
