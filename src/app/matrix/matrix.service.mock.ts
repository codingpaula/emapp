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
  testTopic = new Topic(1, 'Test', Color.orange, true, false);
  testTask = new Task(1, 'Test Task', 1, 23, 1, 12, 20);

  getData(): void {}
  updateTask(task: Task): void {}
  deleteTask(taskId: number): void {}
  selectTask(task: Task): void {}
  toggleTopicVisibility(topicId: number): void {}
  toggleTaskDone(taskId: number): void {}
  updateTopic(topic: Topic): void {}
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
