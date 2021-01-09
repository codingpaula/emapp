import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import {
  DeleteTask,
  GetMatrixData,
  SelectTask,
  ToggleDoneTask,
  ToggleTopicVisibility,
  UpdateTask,
  UpdateTopic,
} from './matrix.actions';
import {
  MatrixService as IMatrixService,
  Task,
  TaskDictionary,
  Topic,
} from './matrix.interfaces';
import {
  selectMatrixActiveTasks,
  selectMatrixActiveTasksByTopics,
  selectMatrixDoneTasks,
  selectMatrixDoneTasksByTopics,
  selectMatrixRequestStatus,
  selectMatrixTasks,
  selectMatrixTasksByTopics,
  selectMatrixTopic,
  selectMatrixTopics,
  selectMatrixTaskHistory,
  selectCurrentTaskHistory,
} from './matrix.selectors';
import { RequestStatus } from '../shared/request-status.interface';

@Injectable({
  providedIn: 'root',
})
export class MatrixService implements IMatrixService, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private readonly store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData(): void {
    this.store.dispatch(new GetMatrixData());
  }

  updateTask(task: Task): void {
    this.store.dispatch(new UpdateTask(task));
  }

  deleteTask(taskid: number): void {
    this.store.dispatch(new DeleteTask(taskid));
  }

  selectTask(task: Task): void {
    console.log(task);
    this.store.dispatch(new SelectTask(task.id));
  }

  toggleTopicVisibility(topicId: number): void {
    this.store.dispatch(new ToggleTopicVisibility(topicId));
  }

  toggleTaskDone(taskId: number): void {
    this.store.dispatch(new ToggleDoneTask(taskId));
  }

  updateTopic(topic: Topic): void {
    this.store.dispatch(new UpdateTopic(topic));
  }

  selectTopics(): Observable<Topic[]> {
    return this.store.pipe(
      select(selectMatrixTopics),
      takeUntil(this.unsubscribe$),
    );
  }

  selectRequestStatus(): Observable<RequestStatus> {
    return this.store.pipe(
      select(selectMatrixRequestStatus),
      takeUntil(this.unsubscribe$),
    );
  }

  selectTasks(): Observable<Task[]> {
    return this.store.pipe(
      select(selectMatrixTasks),
      takeUntil(this.unsubscribe$),
    );
  }

  selectActiveTasks(): Observable<Task[]> {
    return this.store.pipe(
      select(selectMatrixActiveTasks),
      takeUntil(this.unsubscribe$),
    );
  }

  selectDoneTasks(): Observable<Task[]> {
    return this.store.pipe(
      select(selectMatrixDoneTasks),
      takeUntil(this.unsubscribe$),
    );
  }

  selectTasksByTopics(): Observable<TaskDictionary> {
    return this.store.pipe(
      select(selectMatrixTasksByTopics),
      takeUntil(this.unsubscribe$),
    );
  }

  selectActiveTasksByTopics(): Observable<TaskDictionary> {
    return this.store.pipe(
      select(selectMatrixActiveTasksByTopics),
      takeUntil(this.unsubscribe$),
    );
  }

  selectDoneTasksByTopics(): Observable<TaskDictionary> {
    return this.store.pipe(
      select(selectMatrixDoneTasksByTopics),
      takeUntil(this.unsubscribe$),
    );
  }

  selectCurrentTaskHistory(): Observable<Task[]> {
    return this.store.pipe(
      select(selectCurrentTaskHistory),
      takeUntil(this.unsubscribe$),
    );
  }

  selectMatrixTaskHistory(): Observable<number[]> {
    return this.store.pipe(
      select(selectMatrixTaskHistory),
      takeUntil(this.unsubscribe$),
    );
  }

  selectTopicById(id: number): Observable<Topic | undefined> {
    return this.store.pipe(
      select(selectMatrixTopic, id),
      takeUntil(this.unsubscribe$),
    );
  }

  mockFunction(data: any): Observable<any> {
    return of(data);
  }
}
