import { Task } from "@/types/task";
import useTaskStore from "@/store/task.store";
import { ID } from "@/types";

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

const deleteTaskRecursively = (tasks: Task[], taskId: ID): Task[] => {
    return tasks
        .filter(task => task.id !== taskId)
        .map(task => {
            if (task.subtasks && task.subtasks.length > 0) {
                return {
                    ...task,
                    subtasks: deleteTaskRecursively(task.subtasks, taskId),
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

    const deleteTask = (taskId: ID) => {
        setTasks((prevTasks) => deleteTaskRecursively(prevTasks, taskId));
    };

    return { tasks, updateTask, deleteTask };
};

export default useTask;
