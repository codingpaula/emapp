import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { DeleteTask, ToggleDoneTask, UpdateTask } from '../matrix.actions';
import { DropdownItem, Task, TopicDictionary } from '../matrix.interfaces';
import { selectMatrixTopicsDropdownItems } from '../matrix.selectors';
import { MatrixService } from '../matrix.service';

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

  constructor(
    private readonly matrixService: MatrixService,
    private readonly store: Store<AppState>,
  ) {}

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
    this.store.dispatch(new UpdateTask(task));
  }

  deleteTask(taskId: number): void {
    this.store.dispatch(new DeleteTask(taskId));
  }

  toggleDoneTask(taskId: number): void {
    this.store.dispatch(new ToggleDoneTask(taskId));
  }

  trackByFn(index: any, item: Task) {
    return index;
  }

  private subscribeToTaskHistory(): void {
    this.matrixService
      .selectCurrentTaskHistory()
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
    this.matrixService
      .selectTopics()
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
