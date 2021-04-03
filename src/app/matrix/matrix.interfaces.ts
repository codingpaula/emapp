import { Observable } from 'rxjs';
import { Color } from '../shared/color.interfaces';
import { RequestStatus } from '../shared/request-status.interface';

export interface Topic {
  id: number;
  name: string;
  color: Color;
  visible: boolean;
  deleted: boolean;
}

export interface Task {
  id: number;
  name: string;
  importance: number;
  topic: number;
  dueDay: number;
  dueMonth: number;
  dueYear: number;
  description?: string;
  done: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface TaskDictionary {
  [topicId: number]: Task[];
}

export interface TopicDictionary {
  [id: number]: Topic;
}

export interface MatrixData {
  topics: Topic[];
  tasks: Task[];
}

export interface DropdownItem {
  id: number;
  value: string;
  color: string;
}

export interface MatrixService {
  selectTopics: () => Observable<Topic[]>;
  selectRequestStatus: () => Observable<RequestStatus>;
  selectTasks: () => Observable<Task[]>;
  selectActiveTasks: () => Observable<Task[]>;
  selectDoneTasks: () => Observable<Task[]>;
  selectTasksByTopics: () => Observable<TaskDictionary>;
  selectActiveTasksByTopics: () => Observable<TaskDictionary>;
  selectDoneTasksByTopics: () => Observable<TaskDictionary>;
  selectCurrentTaskHistory: () => Observable<Task[]>;
  selectMatrixTaskHistory: () => Observable<number[]>;
  selectTopicById: (id: number) => Observable<Topic | undefined>;
}
