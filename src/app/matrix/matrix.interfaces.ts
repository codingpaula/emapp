import { Observable } from 'rxjs';

export interface Topic {
  id: number;
  name: string;
  color: string;
  visible: boolean;
  tasks: Task[];
}

export interface Task {
  id: number;
  name: string;
  done: boolean;
  importance: number;
  dueDate: Date;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface MatrixState {
  topics: Topic[];
  isLoading: boolean;
  errorMessage: string;
}

export interface MatrixService {
  getData: () => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  toggleTopicVisibility: (topicId: number) => void;
  updateTopic: (topic: Partial<Topic>) => void;
}
