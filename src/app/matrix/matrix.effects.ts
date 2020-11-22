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
  UPDATE_TASK,
  UpdateTask,
  UpdateTaskFailed,
  UpdateTaskSuccess,
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
    new Task(1, 'Tast', 1, 60, 1, 12, 20),
    new Task(2, 'Tast 2', 2, 20, 10, 12, 20),
    new Task(3, 'Tast 3', 1, 33, 30, 11, 20),
    new Task(4, 'Tast 4', 2, 99, 5, 12, 20),
    new Task(5, 'Long Name Task', 3, 44, 7, 12, 20),
    new Task(6, 'tttttt anen', 3, 55, 2, 12, 20),
    new Task(7, 'Tast 2930', 1, 1, 20, 11, 20),
    new Task(8, 'nenene', 2, 2, 28, 11, 20),
    new Task(9, 'nnn', 3, 90, 10, 12, 20, 'test description'),
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
        map((data: MatrixData) => new GetMatrixDataSuccess(data)),
        catchError((message) => of(new GetMatrixDataFailed(message))),
      ),
    ),
  );

  @Effect()
  updateTask$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateTask>(UPDATE_TASK),
    mergeMap((action) =>
      of(action.task).pipe(
        map((task: Task) => new UpdateTaskSuccess(task)),
        catchError((message) => of(new UpdateTaskFailed(message))),
      ),
    ),
  );
}
