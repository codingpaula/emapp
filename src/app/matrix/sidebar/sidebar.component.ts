import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { toggleTopicVisibility } from '../matrix.actions';
import { Topic } from '../matrix.interfaces';
import { selectMatrixTopics } from '../matrix.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectMatrixTopics)
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
    this.store.dispatch(toggleTopicVisibility({ topicId: topicId }));
  }
}
