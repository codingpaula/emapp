import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { Task, TaskDictionary, Topic } from '../matrix.interfaces';
import { selectMatrixTasks, selectMatrixTopics } from '../matrix.selectors';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  topics: Topic[] = [];
  tasks: TaskDictionary = {};
  maxDate = new Date();

  constructor(public readonly matrixService: MatrixService) {
    this.maxDate = new Date(this.maxDate.setMonth(this.maxDate.getMonth() + 1));
  }

  ngOnInit(): void {
    this.matrixService
      .selectTasks()
      .pipe(
        map((tasks) => {
          console.log(tasks);
          if (tasks) {
            this.tasks = tasks;
          }
        }),
      )
      .subscribe();

    this.matrixService
      .selectTopics()
      .pipe(
        map((topics) => {
          if (topics && topics.length > 0) {
            this.topics = topics;
          }
        }),
      )
      .subscribe();
  }

  onSelectTask(event: Task): void {
    this.matrixService.selectTask(event);
  }
}
