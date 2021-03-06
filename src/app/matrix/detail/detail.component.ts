import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { deleteTask, toggleDoneTask, updateTask } from '../matrix.actions';
import { DropdownItem, Task, TopicDictionary } from '../matrix.interfaces';
import {
  selectCurrentTaskHistory,
  selectMatrixTopics,
  selectMatrixTopicsDropdownItems,
} from '../matrix.selectors';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  taskHistory: Task[] = [];
  topics: TopicDictionary = {};
  topicOptions: DropdownItem[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscribeToTaskHistory();
    this.subscribeToTopics();
    this.subscribeToTopicOptions();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeTask(task: Task): void {
    this.store.dispatch(updateTask({ task: task }));
  }

  deleteTask(taskId: number): void {
    this.store.dispatch(deleteTask({ taskId: taskId }));
  }

  toggleDoneTask(taskId: number): void {
    this.store.dispatch(toggleDoneTask({ taskId: taskId }));
  }

  trackByFn(index: any, item: Task) {
    return item.id;
  }

  private subscribeToTaskHistory(): void {
    this.store
      .select(selectCurrentTaskHistory)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((tasks) => {
          if (tasks) {
            this.taskHistory = tasks;
          }
        }),
      )
      .subscribe();
  }

  private subscribeToTopics(): void {
    this.store
      .select(selectMatrixTopics)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((topics) => {
          if (topics.length > 0) {
            topics.forEach((t) => (this.topics[t.id] = t));
          }
        }),
      )
      .subscribe();
  }

  private subscribeToTopicOptions(): void {
    this.store
      .pipe(
        select(selectMatrixTopicsDropdownItems),
        takeUntil(this.unsubscribe$),
        map((options) => {
          if (options.length > 0) {
            this.topicOptions = options;
          }
        }),
      )
      .subscribe();
  }
}
