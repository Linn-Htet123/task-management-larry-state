import { ID } from "./index";

export type Tag = string;
export type Priority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical"
  | "Urgent"
  | "Important"
  | "Routine"
  | "Deferred";

export type PriorityType = { id: Priority; name: Priority }[]

export const priorities: PriorityType = [
  { id: "Low", name: "Low" },
  { id: "Medium", name: "Medium" },
  { id: "High", name: "High" },
  { id: "Critical", name: "Critical" },
  { id: "Urgent", name: "Urgent" },
  { id: "Important", name: "Important" },
  { id: "Routine", name: "Routine" },
  { id: "Deferred", name: "Deferred" },
];


export interface Task {
  id: ID;
  laneId: ID;
  title: string;
  description: string;
  priority: Priority;
  tags: Tag[];
  estimate: string;
  createdAt: Date;
  updatedAt?: Date;
  subtasks?: Task[];
}
