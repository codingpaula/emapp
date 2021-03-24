import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { ToggleTopicVisibility } from '../matrix.actions';
import { Topic } from '../matrix.interfaces';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  topics: Topic[] = [];

  constructor(
    private readonly matrixService: MatrixService,
    private readonly store: Store<AppState>,
  ) {}

  ngOnInit(): void {
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

  toggleVisibility(topicId: number): void {
    this.store.dispatch(new ToggleTopicVisibility(topicId));
  }
}
