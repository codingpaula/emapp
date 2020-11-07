import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Topic } from '../matrix.interfaces';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private readonly matrixService: MatrixService) {}

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

    this.matrixService.getData();
  }

  toggleVisibility(topicId: number): void {
    this.matrixService.toggleTopicVisibility(topicId);
  }
}
