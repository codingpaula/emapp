import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Color } from '../shared/color.interfaces';
import * as MatrixActions from './matrix.actions';
import { MatrixEffects } from './matrix.effects';
import { MatrixData, Task, Topic } from './matrix.interfaces';
import { MatrixService } from './matrix.service';
import { MatrixMockService } from './matrix.service.mock';

describe('MatrixEffects', () => {
  let actions$: Observable<Action>;
  let effects: MatrixEffects;
  let service: MatrixService;

  let task: Task;
  let topic: Topic;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          provideMockActions(() => actions$),
          MatrixEffects,
          { provide: MatrixService, useClass: MatrixMockService },
        ],
      });

      effects = TestBed.get(MatrixEffects);
      service = TestBed.get(MatrixService);
    }),
  );

  beforeEach(() => {
    task = {
      id: 1,
      name: 'test',
      topic: 1,
      importance: 1,
      dueDay: 1,
      dueMonth: 1,
      dueYear: 21,
      done: false,
      deleted: false,
      createdAt: new Date(),
    };
    topic = {
      id: 1,
      name: 'New Topic',
      color: Color.green,
      visible: true,
      deleted: false,
    };
  });

  it('should create matrix effects', () => {
    expect(effects).toBeTruthy();
  });

  describe('getMatrixData', () => {
    let data: MatrixData;

    beforeEach(() => {
      data = {
        topics: [topic],
        tasks: [task],
      };
    });

    it('should return GetMatrixDataSuccess on action', () => {
      // arrange
      const action = MatrixActions.getMatrixData();
      const result = MatrixActions.getMatrixDataSuccess({ data: data });
      const expected = cold('-a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(data));
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.getMatrixData$).toBeObservable(expected);
    });

    it('should only return GetMatrixDataSuccess on GetMatrixData action', () => {
      // arrange
      const action = MatrixActions.getMatrixData();
      const taskAction = MatrixActions.updateTask({ task: task });
      const result = MatrixActions.getMatrixDataSuccess({ data: data });
      const expected = cold('---a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(data));
      // act
      actions$ = hot('-t-a', { t: taskAction, a: action });
      // assert
      expect(effects.getMatrixData$).toBeObservable(expected);
    });

    it('should return GetMatrixDataFailed on error', () => {
      // arrange
      const action = MatrixActions.getMatrixData();
      const result = MatrixActions.getMatrixDataFailed({
        message: 'test error',
      });
      const expected = cold('--c', { c: result });
      spyOn(service, 'mockFunction').and.returnValue(
        cold('-#', {}, 'test error'),
      );
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.getMatrixData$).toBeObservable(expected);
    });
  });

  describe('updateTask', () => {
    it('should return UpdateTaskSuccess with task', () => {
      // arrange
      const value = { a: MatrixActions.updateTask({ task: task }) };
      const result = { a: MatrixActions.updateTaskSuccess({ task: task }) };
      const expected = cold('-a', result);
      spyOn(service, 'mockFunction').and.returnValue(of(task));
      // act
      actions$ = hot('-a', value);
      // assert
      expect(effects.updateTask$).toBeObservable(expected);
    });

    it('should only return UpdateTaskSuccess on UpdateTask action', () => {
      // arrange
      const values = {
        a: MatrixActions.updateTopic({ topic: topic }),
        b: MatrixActions.updateTask({ task: task }),
      };
      const result = { b: MatrixActions.updateTaskSuccess({ task: task }) };
      const expected = cold('---b', result);
      spyOn(service, 'mockFunction').and.returnValue(of(task));
      // act
      actions$ = hot('-a-b', values);
      // assert
      expect(effects.updateTask$).toBeObservable(expected);
    });

    it('should return UpdateTaskFailed on error', () => {
      // arrange
      const action = MatrixActions.updateTask({ task: task });
      const result = MatrixActions.updateTaskFailed({ message: 'test error' });
      const expected = cold('--c', { c: result });
      spyOn(service, 'mockFunction').and.returnValue(
        cold('-#', {}, 'test error'),
      );
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.updateTask$).toBeObservable(expected);
    });
  });

  describe('deleteTask', () => {
    let deletedTask: Task;

    beforeEach(() => {
      deletedTask = {
        ...task,
        name: 'deleted',
        deleted: true,
        createdAt: new Date('2020-10-12T12:00:00.000Z'),
        updatedAt: new Date('2020-12-12T12:00:00.000Z'),
        deletedAt: new Date('2020-12-12T12:00:00.000Z'),
      };
    });

    it('should return DeleteTaskSuccess with deleted task', () => {
      // arrange
      const value = { a: MatrixActions.deleteTask({ taskId: task.id }) };
      const result = {
        a: MatrixActions.deleteTaskSuccess({ task: deletedTask }),
      };
      const expected = cold('-a', result);
      spyOn(service, 'mockFunction').and.returnValue(of(task.id));
      // act
      actions$ = hot('-a', value);
      // assert
      expect(effects.deleteTask$).toBeObservable(expected);
    });

    it('should only return DeleteTaskSuccess on DeleteTask action', () => {
      // arrange
      const values = {
        a: MatrixActions.updateTask({ task: task }),
        b: MatrixActions.deleteTask({ taskId: task.id }),
      };
      const result = {
        b: MatrixActions.deleteTaskSuccess({ task: deletedTask }),
      };
      const expected = cold('---b', result);
      spyOn(service, 'mockFunction').and.returnValue(of(task.id));
      // act
      actions$ = hot('-a-b', values);
      // assert
      expect(effects.deleteTask$).toBeObservable(expected);
    });

    it('should return DeleteTaskFailed on error', () => {
      // arrange
      const action = MatrixActions.deleteTask({ taskId: task.id });
      const result = MatrixActions.deleteTaskFailed({ message: 'test error' });
      const expected = cold('--c', { c: result });
      spyOn(service, 'mockFunction').and.returnValue(
        cold('-#', {}, 'test error'),
      );
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.deleteTask$).toBeObservable(expected);
    });
  });

  describe('addTopic', () => {
    it('should return AddTopicSuccess on action', () => {
      // arrange
      const action = MatrixActions.addTopic();
      const result = MatrixActions.addTopicSuccess({ topic: topic });
      const expected = cold('-a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(topic.id));
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.addTopic$).toBeObservable(expected);
    });

    it('should only return AddTopicSuccess on AddTopic action', () => {
      // arrange
      const action = MatrixActions.addTopic();
      const taskAction = MatrixActions.updateTask({ task: task });
      const result = MatrixActions.addTopicSuccess({ topic: topic });
      const expected = cold('---a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(topic.id));
      // act
      actions$ = hot('-t-a', { t: taskAction, a: action });
      // assert
      expect(effects.addTopic$).toBeObservable(expected);
    });

    it('should return AddTopicError on error', () => {
      // arrange
      const action = MatrixActions.addTopic();
      const result = MatrixActions.addTopicFailed({ message: 'test error' });
      const expected = cold('--c', { c: result });
      spyOn(service, 'mockFunction').and.returnValue(
        cold('-#', {}, 'test error'),
      );
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.addTopic$).toBeObservable(expected);
    });
  });

  describe('updateTopic', () => {
    it('should return UpdateTopicSuccess with topic', () => {
      // arrange
      const action = MatrixActions.updateTopic({ topic: topic });
      const result = MatrixActions.updateTopicSuccess({ topic: topic });
      const expected = cold('-a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(topic));
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.updateTopic$).toBeObservable(expected);
    });

    it('should only return UpdateTopicSuccess on UpdateTopic action', () => {
      // arrange
      const action = MatrixActions.updateTopic({ topic: topic });
      const taskAction = MatrixActions.updateTask({ task: task });
      const result = MatrixActions.updateTopicSuccess({ topic: topic });
      const expected = cold('---a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(topic));
      // act
      actions$ = hot('-t-a', { t: taskAction, a: action });
      // assert
      expect(effects.updateTopic$).toBeObservable(expected);
    });

    it('should return UpdateTopicFailed on error', () => {
      // arrange
      const action = MatrixActions.updateTopic({ topic: topic });
      const result = MatrixActions.updateTopicFailed({ message: 'test error' });
      const expected = cold('--c', { c: result });
      spyOn(service, 'mockFunction').and.returnValue(
        cold('-#', {}, 'test error'),
      );
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.updateTopic$).toBeObservable(expected);
    });
  });
});
