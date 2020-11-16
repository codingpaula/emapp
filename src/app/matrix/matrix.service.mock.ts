import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Color } from '../shared/color.interfaces';
import {
  MatrixService,
  Task,
  TaskDictionary,
  Topic,
} from './matrix.interfaces';

@Injectable()
export class MatrixMockService implements MatrixService {
  testTopic = new Topic(1, 'Test', Color.orange, true, false);

  getData(): void {}
  updateTask(task: Task): void {}
  deleteTask(taskId: number): void {}
  toggleTopicVisibility(topicId: number): void {}
  updateTopic(topic: Topic): void {}
  selectTopics(): Observable<Topic[]> {
    return of([{ ...this.testTopic } as Topic]);
  }
  selectIsLoading(): Observable<boolean> {
    return of(true);
  }
  selectErrorMessage(): Observable<string | undefined> {
    return of(undefined);
  }
  selectTasks(): Observable<TaskDictionary> {
    return of({ [1]: [new Task(1, 'Test Task', 1, 23)] });
  }
  selectTopicById(id: number): Observable<Topic | undefined> {
    return of({ ...this.testTopic } as Topic);
  }
}