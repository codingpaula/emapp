import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../app.state';
import { RequestStatus } from '../shared/request-status.interface';
import {
  MatrixService as IMatrixService,
  Task,
  TaskDictionary,
  Topic,
} from './matrix.interfaces';
import {
  selectCurrentTaskHistory,
  selectMatrixActiveTasks,
  selectMatrixActiveTasksByTopics,
  selectMatrixDoneTasks,
  selectMatrixDoneTasksByTopics,
  selectMatrixRequestStatus,
  selectMatrixTaskHistory,
  selectMatrixTasks,
  selectMatrixTasksByTopics,
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
    console.log(data);
    return of(data);
  }
}
