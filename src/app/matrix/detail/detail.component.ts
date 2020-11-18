import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from '../matrix.interfaces';
import { MatrixService } from '../matrix.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  currentTask: Task | undefined;

  constructor(private readonly matrixService: MatrixService) {}

  ngOnInit(): void {
    this.matrixService
      .selectCurrentTask()
      .pipe(
        map((currentTask) => {
          if (currentTask) {
            this.currentTask = currentTask;
          }
        }),
      )
      .subscribe();
  }
}
