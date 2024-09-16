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
        title: "Develop User Authentication Service",
        description: "Create an authentication service with JWT and OAuth2 support. The service should handle user registration, login, password reset, and user profile management. Additionally, it should support multi-factor authentication and integration with third-party identity providers for enhanced security. Regular logging and monitoring mechanisms must be implemented to detect and prevent suspicious activities, ensuring compliance with security standards.",
        tags: ["Backend", "Security"],
        priority: "High",
        estimate: "8h",
        subtasks: [
          {
            id: 7,
            laneId: 1,
            title: "Implement JWT Authentication",
            description: "Set up JWT authentication for secure API endpoints. Ensure token expiration and refresh mechanisms are in place. Implement role-based access control to manage different user permissions. Consider incorporating refresh tokens to maintain user sessions efficiently, and provide an endpoint for token invalidation to enhance security.",
            tags: ["Backend", "Security"],
            priority: "High",
            estimate: "4h",
            subtasks: [
              {
                id: 100,
                laneId: 1,
                title: "Create JWT Token Generation Endpoint",
                description: "Develop the endpoint for generating JWT tokens upon successful user login. Ensure the token includes the necessary user claims and is signed securely. Implement proper error handling for edge cases, such as invalid login attempts, and log events for monitoring and debugging.",
                tags: ["Backend", "Security"],
                priority: "High",
                estimate: "2h",
                createdAt: new Date(),
              },
            ],
            createdAt: new Date(),
          },
          {
            id: 8,
            laneId: 1,
            title: "Set Up OAuth2 Integration",
            description: "Integrate OAuth2 for third-party authentication providers like Google and Facebook. The integration should support both user registration and login processes. Implement fallback mechanisms for situations where third-party services are unavailable, and store additional user profile information for personalization.",
            tags: ["Backend", "Security"],
            priority: "Medium",
            estimate: "4h",
            subtasks: [],
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(),
      },
      {
        id: 6,
        laneId: 2,
        title: "Design Frontend Dashboard UI",
        description: "Create a modern and responsive dashboard UI for the application. Include interactive charts, tables, and user interaction components. Ensure the dashboard adapts seamlessly to both desktop and mobile devices, with a dark mode feature for enhanced user comfort. Incorporate feedback loops to gather user input and iterate on the design for improved usability.",
        tags: ["Frontend", "Design"],
        priority: "Medium",
        estimate: "12h",
        createdAt: new Date(),
      },

    ],
    isPersist: true,
  });

  return { tasks, setTasks };
};

export default useTaskStore;
