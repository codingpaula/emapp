import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Color } from '../shared/color.interfaces';
import {
  MatrixService,
  Task,
  TaskDictionary,
  Topic,
} from './matrix.interfaces';
import { RequestStatus } from '../shared/request-status.interface';

@Injectable()
export class MatrixMockService implements MatrixService {
  testTopic: Topic = {
    id: 1,
    name: 'Test',
    color: Color.orange,
    visible: true,
    deleted: false,
  };
  testTask: Task = {
    id: 1,
    name: 'Test Task',
    importance: 23,
    topic: 1,
    dueDay: 1,
    dueMonth: 12,
    dueYear: 20,
    done: false,
    deleted: false,
    createdAt: new Date(),
  };

  selectTopics(): Observable<Topic[]> {
    return of([{ ...this.testTopic } as Topic]);
  }
  selectRequestStatus(): Observable<RequestStatus> {
    return of({ isLoading: true, errorMessage: undefined });
  }
  selectTasks(): Observable<Task[]> {
    return of([this.testTask]);
  }
  selectActiveTasks(): Observable<Task[]> {
    return of([this.testTask]);
  }
  selectDoneTasks(): Observable<Task[]> {
    return of([{ ...this.testTask, done: true } as Task]);
  }
  selectTasksByTopics(): Observable<TaskDictionary> {
    return of({ [1]: [this.testTask] });
  }
  selectActiveTasksByTopics(): Observable<TaskDictionary> {
    return of({ [1]: [this.testTask] });
  }
  selectDoneTasksByTopics(): Observable<TaskDictionary> {
    return of({ [1]: [{ ...this.testTask, done: true } as Task] });
  }
  selectCurrentTask(): Observable<Task | undefined> {
    return of(this.testTask);
  }
  selectCurrentTaskHistory(): Observable<Task[]> {
    return of([this.testTask]);
  }
  selectMatrixTaskHistory(): Observable<number[]> {
    return of([1]);
  }
  selectTopicById(id: number): Observable<Topic | undefined> {
    return of({ ...this.testTopic } as Topic);
  }
  mockFunction(data: any): Observable<any> {
    return of(data);
  }
}
