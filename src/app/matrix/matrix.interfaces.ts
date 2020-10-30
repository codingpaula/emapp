export class Topic {
  constructor(
    public id: number,
    public name: string,
    public color: string,
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
    public done: boolean = false,
    public dueDate: Date = new Date(),
    public deleted: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public deletedAt: Date = new Date(),
  ) {}
}

export interface TaskDictionary {
  [topicId: number]: Task[];
}

export interface MatrixData {
  topics: Topic[];
  tasks: Task[];
}

export interface MatrixState {
  topics: Topic[];
  tasks: TaskDictionary;
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
