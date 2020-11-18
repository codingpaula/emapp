import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import {
  DeleteTask,
  GetMatrixData,
  SelectTask,
  ToggleTopicVisibility,
  UpdateTask,
  UpdateTopic,
} from './matrix.actions';
import {
  CurrentTask,
  MatrixService as IMatrixService,
  Task,
  TaskDictionary,
  Topic,
} from './matrix.interfaces';
import {
  selectCurrentTask,
  selectMatrixErrorMessage,
  selectMatrixIsLoading,
  selectMatrixTasks,
  selectMatrixTopic,
  selectMatrixTopics,
} from './matrix.selectors';

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
    this.store.dispatch(
      new SelectTask({ taskId: task.id, topicId: task.topic }),
    );
  }
  toggleTopicVisibility(topicId: number): void {
    this.store.dispatch(new ToggleTopicVisibility(topicId));
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

  selectIsLoading(): Observable<boolean> {
    return this.store.pipe(
      select(selectMatrixIsLoading),
      takeUntil(this.unsubscribe$),
    );
  }

  selectErrorMessage(): Observable<string | undefined> {
    return this.store.pipe(
      select(selectMatrixErrorMessage),
      takeUntil(this.unsubscribe$),
    );
  }

  selectTasks(): Observable<TaskDictionary> {
    return this.store.pipe(
      select(selectMatrixTasks),
      takeUntil(this.unsubscribe$),
    );
  }

  selectCurrentTask(): Observable<Task | undefined> {
    return this.store.pipe(
      select(selectCurrentTask),
      takeUntil(this.unsubscribe$),
    );
  }

  selectTopicById(id: number): Observable<Topic | undefined> {
    return this.store.pipe(
      select(selectMatrixTopic),
      takeUntil(this.unsubscribe$),
    );
  }
}
