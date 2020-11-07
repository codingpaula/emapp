import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import {
  DeleteTask,
  GetMatrixData,
  ToggleTopicVisibility,
  UpdateTask,
  UpdateTopic,
} from './matrix.actions';
import {
  MatrixService as IMatrixService,
  Task,
  Topic,
} from './matrix.interfaces';
import { selectMatrixTopics } from './matrix.selectors';

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
}
