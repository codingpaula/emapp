import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  GetMatrixData,
  GetMatrixDataFailed,
  GetMatrixDataSuccess,
  GET_MATRIX_DATA,
} from './matrix.actions';
import { MatrixData, Task, Topic } from './matrix.interfaces';

@Injectable()
export class MatrixEffects {
  private topics: Topic[] = [
    new Topic(1, 'Test', '#123456', true, false),
    new Topic(2, 'Test 2', '#654321', true, false),
  ];
  private tasks: Task[] = [
    new Task(1, 'Tast', 1, 60),
    new Task(2, 'Tast 2', 2, 20),
    new Task(3, 'Tast 3', 1, 33),
    new Task(4, 'Tast 4', 2, 99),
  ];
  private data: MatrixData = {
    topics: this.topics,
    tasks: this.tasks,
  };

  constructor(private actions$: Actions) {}

  @Effect()
  getMatrixData$: Observable<Action> = this.actions$.pipe(
    ofType<GetMatrixData>(GET_MATRIX_DATA),
    mergeMap(() =>
      of(this.data).pipe(
        map((data: MatrixData) => {
          console.log(data);
          return new GetMatrixDataSuccess(data);
        }),
        catchError((message) => of(new GetMatrixDataFailed(message))),
      ),
    ),
  );
}
