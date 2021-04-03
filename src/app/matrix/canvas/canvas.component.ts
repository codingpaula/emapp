import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { selectTask } from '../matrix.actions';
import {
  selectMatrixActiveTasksByTopics,
  selectMatrixTopics,
} from '../matrix.selectors';
import { Task, TaskDictionary, Topic } from '../matrix.interfaces';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, OnDestroy {
  topics: Topic[] = [];
  tasks: TaskDictionary = {};
  maxDate = new Date();

  private unsubscribe$ = new Subject<void>();

  constructor(public readonly store: Store<AppState>) {
    this.maxDate = new Date(this.maxDate.setMonth(this.maxDate.getMonth() + 1));
  }

  ngOnInit(): void {
    this.store
      .select(selectMatrixActiveTasksByTopics)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((tasks) => {
          if (tasks) {
            this.tasks = tasks;
          }
        }),
      )
      .subscribe();

    this.store
      .select(selectMatrixTopics)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((topics) => {
          if (topics && topics.length > 0) {
            this.topics = topics;
          }
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelectTask(event: Task): void {
    this.store.dispatch(selectTask({ currentTaskId: event.id }));
  }
}
