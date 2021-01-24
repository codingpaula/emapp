import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Task, TopicDictionary } from '../matrix.interfaces';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  taskHistory: Task[] = [];
  topics: TopicDictionary = {};

  unsubscribe$ = new Subject<void>();

  constructor(private readonly matrixService: MatrixService) {}

  ngOnInit(): void {
    this.subscribeToTaskHistory();
    this.subscribeToTopics();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  changeTask(task: Task): void {
    this.matrixService.updateTask(task);
  }

  deleteTask(taskId: number): void {
    this.matrixService.deleteTask(taskId);
  }

  toggleDoneTask(taskId: number): void {
    this.matrixService.toggleTaskDone(taskId);
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
}
