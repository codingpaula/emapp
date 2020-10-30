import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Topic } from '../matrix.interfaces';
import { selectMatrixTopics } from '../matrix.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  topics: Topic[];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store
      .pipe(
        select(selectMatrixTopics),
        map((topics) => {
          if (topics.length > 0) {
            this.topics = topics;
          }
        }),
      )
      .subscribe();
  }
}
