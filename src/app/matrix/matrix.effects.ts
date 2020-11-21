import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Color } from '../shared/color.interfaces';
import {
  GET_MATRIX_DATA,
  GetMatrixData,
  GetMatrixDataFailed,
  GetMatrixDataSuccess,
} from './matrix.actions';
import { MatrixData, Task, Topic } from './matrix.interfaces';

@Injectable()
export class MatrixEffects {
  private topics: Topic[] = [
    new Topic(1, 'Test', Color.blue, true, false),
    new Topic(2, 'Test 2', Color.green, true, false),
    new Topic(3, 'LongName Topic', Color.orange, true, false),
  ];
  private tasks: Task[] = [
    new Task(1, 'Tast', 1, 60, new Date('2020-12-01T12:00:00.000Z')),
    new Task(2, 'Tast 2', 2, 20),
    new Task(3, 'Tast 3', 1, 33),
    new Task(4, 'Tast 4', 2, 99),
    new Task(5, 'Long Name Task', 3, 44),
    new Task(6, 'tttttt anen', 3, 55, new Date('2020-12-02T12:00:00.000Z')),
    new Task(7, 'Tast 2930', 1, 1, new Date('2020-11-20T12:00:00.000Z')),
    new Task(8, 'nenene', 2, 2, new Date('2020-11-28T12:00:00.000Z')),
    new Task(
      9,
      'nnn',
      3,
      90,
      new Date('2020-12-10T12:00:00.000Z'),
      'test description',
    ),
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
