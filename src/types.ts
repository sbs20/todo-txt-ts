export type Priority = 'A' | 'B' | 'C' | 'D' | string;
export type SortDirection = 'asc' | 'desc';

export interface Dictionary<T> {
  [key: string]: T
}

export interface ITask {
  isComplete: boolean;
  projects: string[];
  contexts: string[];
  dueDate?: Date;
  completionDate?: Date;
  creationDate?: Date;
  priority?: Priority;
  fields: Dictionary<string>;
  body: string;
  raw?: string;
  index?: number;
}

export interface ISortOption {
  field: keyof ITask;
  direction?: SortDirection;
}
