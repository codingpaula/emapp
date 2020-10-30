import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { TaskDictionary, Topic } from '../matrix.interfaces';
import { selectMatrixTasks, selectMatrixTopics } from '../matrix.selectors';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  topics: Topic[] = [];
  tasks: TaskDictionary = {};

  constructor(public readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(selectMatrixTasks),
        map((tasks) => {
          console.log(tasks);
          if (tasks) {
            this.tasks = tasks;
          }
        }),
      )
      .subscribe();

    this.store
      .pipe(
        select(selectMatrixTopics),
        map((topics) => {
          if (topics && topics.length > 0) {
            this.topics = topics;
          }
        }),
      )
      .subscribe();
  }
}
