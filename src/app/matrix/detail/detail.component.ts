import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task, Topic } from '../matrix.interfaces';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  taskHistory: Task[] = [];
  topics: { [key: number]: Topic } = {};

  constructor(private readonly matrixService: MatrixService) {}

  ngOnInit(): void {
    this.subscribeToTaskHistory();
    this.subscribeToTopics();
  }

  changeTask(task: Task): void {
    this.matrixService.updateTask(task);
  }

  private subscribeToTaskHistory(): void {
    this.matrixService
      .selectTaskHistory()
      .pipe(
        map((tasks) => {
          if (tasks.length > 0) {
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
        map((topics) => {
          if (topics.length > 0) {
            topics.forEach((t) => (this.topics[t.id] = t));
          }
        }),
      )
      .subscribe();
  }
}
