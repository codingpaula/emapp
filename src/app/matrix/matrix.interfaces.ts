import { Observable } from 'rxjs';
import { Color } from '../shared/color.interfaces';

export class Topic {
  constructor(
    public id: number,
    public name: string,
    public color: Color,
    public visible: boolean,
    public deleted: boolean,
  ) {}

  toggleVisibility() {
    this.visible = !this.visible;
  }
}

export class Task {
  constructor(
    public id: number,
    public name: string,
    public topic: number,
    public importance: number,
    public dueDay: number,
    public dueMonth: number,
    public dueYear: number,
    public description: string = '',
    public done: boolean = false,
    public deleted: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date = new Date(),
  ) {}
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

export interface MatrixState {
  topics: Topic[];
  tasks: Task[];
  taskHistory: number[];
  isLoading: boolean;
  errorMessage?: string;
}

export interface MatrixService {
  getData: () => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  selectTask: (task: Task) => void;
  toggleTopicVisibility: (topicId: number) => void;
  updateTopic: (topic: Topic) => void;
  selectTopics: () => Observable<Topic[]>;
  selectIsLoading: () => Observable<boolean>;
  selectErrorMessage: () => Observable<string | undefined>;
  selectTasks: () => Observable<Task[]>;
  selectActiveTasks: () => Observable<Task[]>;
  selectDoneTasks: () => Observable<Task[]>;
  selectTasksByTopics: () => Observable<TaskDictionary>;
  selectActiveTasksByTopics: () => Observable<TaskDictionary>;
  selectDoneTasksByTopics: () => Observable<TaskDictionary>;
  selectTaskHistory: () => Observable<Task[]>;
  selectTopicById: (id: number) => Observable<Topic | undefined>;
}
