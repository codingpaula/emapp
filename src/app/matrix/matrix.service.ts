import { Injectable } from '@angular/core';
import {
  MatrixService as IMatrixService,
  Topic,
  Task,
} from './matrix.interfaces';
import { Store } from '@ngrx/store';
import {
  getMatrixData,
  updateTask,
  deleteTask,
  toggleTopicVisibility,
  updateTopic,
} from './matrix.actions';

@Injectable()
export class MatrixService implements IMatrixService {
  private readonly TOPICS: Topic[] = [
    {
      id: 1,
      name: 'Test Topic',
      color: '#123456',
      visible: true,
      tasks: [],
    },
    {
      id: 2,
      name: 'Other Topic',
      color: '#654321',
      visible: true,
      tasks: [],
    },
  ];

  constructor(private readonly store: Store) {}

  getData(): void {
    this.store.dispatch(getMatrixData());
  }

  updateTask(task: Task): void {
    this.store.dispatch(updateTask({ task }));
  }

  deleteTask(taskId: number): void {
    this.store.dispatch(deleteTask({ taskId }));
  }

  toggleTopicVisibility(topicId: number): void {
    this.store.dispatch(toggleTopicVisibility({ topicId }));
  }

  updateTopic(topic: Partial<Topic>): void {
    this.store.dispatch(updateTopic({ topic }));
  }
}
