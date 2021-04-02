import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Color } from '../shared/color.interfaces';
import {
  ADD_TOPIC,
  AddTopic,
  AddTopicFailed,
  AddTopicSuccess,
  DELETE_TASK,
  DeleteTask,
  DeleteTaskFailed,
  DeleteTaskSuccess,
  GET_MATRIX_DATA,
  GetMatrixData,
  GetMatrixDataFailed,
  GetMatrixDataSuccess,
  UPDATE_TASK,
  UPDATE_TOPIC,
  UpdateTask,
  UpdateTaskFailed,
  UpdateTaskSuccess,
  UpdateTopic,
  UpdateTopicFailed,
  UpdateTopicSuccess,
} from './matrix.actions';
import { MatrixData, Task, Topic } from './matrix.interfaces';
import { MatrixService } from './matrix.service';

@Injectable()
export class MatrixEffects {
  private topics: Topic[] = [
    { id: 1, name: 'Test', color: Color.blue, visible: true, deleted: false },
    {
      id: 2,
      name: 'Test 2',
      color: Color.green,
      visible: true,
      deleted: false,
    },
    {
      id: 3,
      name: 'LongName Topic',
      color: Color.orange,
      visible: true,
      deleted: false,
    },
  ];
  private dummyTask: Task = {
    id: 0,
    name: '',
    importance: 0,
    topic: 0,
    dueDay: 1,
    dueMonth: 1,
    dueYear: 0,
    done: false,
    deleted: false,
    createdAt: new Date(),
  };
  private tasks: Task[] = [
    {
      ...this.dummyTask,
      id: 1,
      name: 'Tast',
      importance: 60,
      topic: 1,
      dueMonth: 4,
      dueYear: 21,
    },
    {
      ...this.dummyTask,
      id: 2,
      name: 'Tast 2',
      importance: 20,
      topic: 2,
      dueDay: 10,
      dueMonth: 4,
      dueYear: 21,
    },
    {
      ...this.dummyTask,
      id: 3,
      name: 'Tast 3',
      importance: 33,
      topic: 1,
      dueDay: 30,
      dueMonth: 5,
      dueYear: 21,
    },
    {
      ...this.dummyTask,
      id: 4,
      name: 'Tast 4',
      importance: 99,
      topic: 2,
      dueDay: 5,
      dueMonth: 4,
      dueYear: 21,
    },
    {
      ...this.dummyTask,
      id: 5,
      name: 'Long Name Task',
      importance: 44,
      topic: 3,
      dueDay: 7,
      dueMonth: 12,
      dueYear: 20,
    },
    {
      ...this.dummyTask,
      id: 6,
      name: 'tttttt anen',
      importance: 55,
      topic: 3,
      dueDay: 2,
      dueMonth: 12,
      dueYear: 20,
    },
    {
      ...this.dummyTask,
      id: 7,
      name: 'Tast 2930',
      importance: 1,
      topic: 1,
      dueDay: 20,
      dueMonth: 11,
      dueYear: 20,
    },
    {
      ...this.dummyTask,
      id: 8,
      name: 'nenene',
      importance: 2,
      topic: 2,
      dueDay: 28,
      dueMonth: 11,
      dueYear: 20,
    },
    {
      ...this.dummyTask,
      id: 9,
      name: 'nnn',
      importance: 90,
      topic: 3,
      dueDay: 10,
      dueMonth: 12,
      dueYear: 20,
      description: 'test description',
    },
  ];
  private data: MatrixData = {
    topics: this.topics,
    tasks: this.tasks,
  };

  constructor(
    private actions$: Actions,
    private readonly matrixService: MatrixService,
  ) {}

  @Effect()
  getMatrixData$: Observable<Action> = this.actions$.pipe(
    ofType<GetMatrixData>(GET_MATRIX_DATA),
    mergeMap(() =>
      this.matrixService.mockFunction(this.data).pipe(
        map((data: MatrixData) => new GetMatrixDataSuccess(data)),
        catchError((message) => of(new GetMatrixDataFailed(message))),
      ),
    ),
  );

  @Effect()
  updateTask$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateTask>(UPDATE_TASK),
    mergeMap((action) =>
      this.matrixService.mockFunction(action.task).pipe(
        map((task: Task) => new UpdateTaskSuccess(task)),
        catchError((message) => of(new UpdateTaskFailed(message))),
      ),
    ),
  );

  @Effect()
  deleteTask$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteTask>(DELETE_TASK),
    mergeMap((action) =>
      this.matrixService.mockFunction(action.taskId).pipe(
        map(
          (taskId: number) =>
            new DeleteTaskSuccess({
              id: taskId,
              name: 'deleted',
              importance: 1,
              topic: 1,
              dueDay: 1,
              dueMonth: 1,
              dueYear: 21,
              done: false,
              deleted: true,
              createdAt: new Date('2020-10-12T12:00:00.000Z'),
              updatedAt: new Date('2020-12-12T12:00:00.000Z'),
              deletedAt: new Date('2020-12-12T12:00:00.000Z'),
            }),
        ),
        catchError((message) => of(new DeleteTaskFailed(message))),
      ),
    ),
  );

  @Effect()
  addTopic$: Observable<Action> = this.actions$.pipe(
    ofType<AddTopic>(ADD_TOPIC),
    mergeMap((action) =>
      this.matrixService
        .mockFunction(Math.floor(Math.random() * (100 - 4) - 4))
        .pipe(
          map(
            (id: number) =>
              new AddTopicSuccess({
                id: id,
                name: 'New Topic',
                color: Color.green,
                visible: true,
                deleted: false,
              }),
          ),
          catchError((message) => of(new AddTopicFailed(message))),
        ),
    ),
  );

  @Effect()
  updateTopic$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateTopic>(UPDATE_TOPIC),
    mergeMap((action) =>
      this.matrixService.mockFunction(action.topic).pipe(
        map((topic: Topic) => new UpdateTopicSuccess(topic)),
        catchError((message) => of(new UpdateTopicFailed(message))),
      ),
    ),
  );
}
