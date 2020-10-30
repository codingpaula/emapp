import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { GetMatrixData, ToggleTopicVisibility } from '../matrix.actions';
import { Topic } from '../matrix.interfaces';
import { selectMatrixTopics } from '../matrix.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  topics: Topic[];

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(selectMatrixTopics),
        map((topics) => {
          console.log(topics);
          if (topics && topics.length > 0) {
            console.log('yay!');
            console.log(topics);
            this.topics = topics;
          }
        }),
      )
      .subscribe();

    this.store.dispatch(new GetMatrixData());
  }

  toggleVisibility(topicId: number): void {
    this.store.dispatch(new ToggleTopicVisibility(topicId));
  }
}
