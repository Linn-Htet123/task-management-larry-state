import { ID } from "./index";

export type Tag = string[];

export type Priority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical"
  | "Urgent"
  | "Important"
  | "Routine"
  | "Deferred";

export interface Task {
  id: ID;
  laneId: ID;
  title: string;
  description: string;
  status: string;
  priority: Priority;
  tags: Tag;
  estimate: string;
}
