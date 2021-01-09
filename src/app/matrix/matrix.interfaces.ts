import { Observable } from 'rxjs';
import { Color } from '../shared/color.interfaces';
import { RequestStatus } from '../shared/request-status.interface';

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

  toggleDone() {
    this.done = !this.done;
  }
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
  requestStatus: RequestStatus;
}

export interface MatrixService {
  getData: () => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  selectTask: (task: Task) => void;
  toggleTopicVisibility: (topicId: number) => void;
  toggleTaskDone: (taskId: number) => void;
  updateTopic: (topic: Topic) => void;
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
