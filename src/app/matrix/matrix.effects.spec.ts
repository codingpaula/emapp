import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Color } from '../shared/color.interfaces';
import {
  AddTopic,
  AddTopicFailed,
  AddTopicSuccess,
  DeleteTask,
  DeleteTaskFailed,
  DeleteTaskSuccess,
  GetMatrixData,
  GetMatrixDataFailed,
  GetMatrixDataSuccess,
  MatrixAction,
  UpdateTask,
  UpdateTaskFailed,
  UpdateTaskSuccess,
  UpdateTopic,
  UpdateTopicFailed,
  UpdateTopicSuccess,
} from './matrix.actions';
import { MatrixEffects } from './matrix.effects';
import { MatrixData, Task, Topic } from './matrix.interfaces';
import { MatrixService } from './matrix.service';
import { MatrixMockService } from './matrix.service.mock';

describe('MatrixEffects', () => {
  let actions$: Observable<MatrixAction>;
  let effects: MatrixEffects;
  let service: MatrixService;

  let task: Task;
  let topic: Topic;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        MatrixEffects,
        { provide: MatrixService, useClass: MatrixMockService },
      ],
    });

    effects = TestBed.get(MatrixEffects);
    service = TestBed.get(MatrixService);
  }));

  beforeEach(() => {
    task = new Task(1, 'test', 1, 1, 1, 1, 21);
    topic = new Topic(1, 'New Topic', Color.green, true, false);
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
      const action = new GetMatrixData();
      const result = new GetMatrixDataSuccess(data);
      const expected = cold('-a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(data));
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.getMatrixData$).toBeObservable(expected);
    });

    it('should only return GetMatrixDataSuccess on GetMatrixData action', () => {
      // arrange
      const action = new GetMatrixData();
      const taskAction = new UpdateTask(task);
      const result = new GetMatrixDataSuccess(data);
      const expected = cold('---a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(data));
      // act
      actions$ = hot('-t-a', { t: taskAction, a: action });
      // assert
      expect(effects.getMatrixData$).toBeObservable(expected);
    });

    it('should return GetMatrixDataFailed on error', () => {
      // arrange
      const action = new GetMatrixData();
      const result = new GetMatrixDataFailed('test error');
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
      const value = { a: new UpdateTask(task) };
      const result = { a: new UpdateTaskSuccess(task) };
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
        a: new UpdateTopic(topic),
        b: new UpdateTask(task),
      };
      const result = { b: new UpdateTaskSuccess(task) };
      const expected = cold('---b', result);
      spyOn(service, 'mockFunction').and.returnValue(of(task));
      // act
      actions$ = hot('-a-b', values);
      // assert
      expect(effects.updateTask$).toBeObservable(expected);
    });

    it('should return UpdateTaskFailed on error', () => {
      // arrange
      const action = new UpdateTask(task);
      const result = new UpdateTaskFailed('test error');
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
      deletedTask = new Task(
        1,
        'deleted',
        1,
        1,
        1,
        1,
        21,
        '',
        false,
        true,
        new Date('2020-10-12T12:00:00.000Z'),
        new Date('2020-12-12T12:00:00.000Z'),
        new Date('2020-12-12T12:00:00.000Z'),
      );
    });

    it('should return DeleteTaskSuccess with deleted task', () => {
      // arrange
      const value = { a: new DeleteTask(task.id) };
      const result = { a: new DeleteTaskSuccess(deletedTask) };
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
        a: new UpdateTask(task),
        b: new DeleteTask(task.id),
      };
      const result = { b: new DeleteTaskSuccess(deletedTask) };
      const expected = cold('---b', result);
      spyOn(service, 'mockFunction').and.returnValue(of(task.id));
      // act
      actions$ = hot('-a-b', values);
      // assert
      expect(effects.deleteTask$).toBeObservable(expected);
    });

    it('should return DeleteTaskFailed on error', () => {
      // arrange
      const action = new DeleteTask(task.id);
      const result = new DeleteTaskFailed('test error');
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
      const action = new AddTopic();
      const result = new AddTopicSuccess(topic);
      const expected = cold('-a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(topic.id));
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.addTopic$).toBeObservable(expected);
    });

    it('should only return AddTopicSuccess on AddTopic action', () => {
      // arrange
      const action = new AddTopic();
      const taskAction = new UpdateTask(task);
      const result = new AddTopicSuccess(topic);
      const expected = cold('---a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(topic.id));
      // act
      actions$ = hot('-t-a', { t: taskAction, a: action });
      // assert
      expect(effects.addTopic$).toBeObservable(expected);
    });

    it('should return AddTopicError on error', () => {
      // arrange
      const action = new AddTopic();
      const result = new AddTopicFailed('test error');
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
      const action = new UpdateTopic(topic);
      const result = new UpdateTopicSuccess(topic);
      const expected = cold('-a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(topic));
      // act
      actions$ = hot('-a', { a: action });
      // assert
      expect(effects.updateTopic$).toBeObservable(expected);
    });

    it('should only return UpdateTopicSuccess on UpdateTopic action', () => {
      // arrange
      const action = new UpdateTopic(topic);
      const taskAction = new UpdateTask(task);
      const result = new UpdateTopicSuccess(topic);
      const expected = cold('---a', { a: result });
      spyOn(service, 'mockFunction').and.returnValue(of(topic));
      // act
      actions$ = hot('-t-a', { t: taskAction, a: action });
      // assert
      expect(effects.updateTopic$).toBeObservable(expected);
    });

    it('should return UpdateTopicFailed on error', () => {
      // arrange
      const action = new UpdateTopic(topic);
      const result = new UpdateTopicFailed('test error');
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
