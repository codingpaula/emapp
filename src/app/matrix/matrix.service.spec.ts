import { async, TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Color } from '../shared/color.interfaces';
import {
  DeleteTask,
  GetMatrixData,
  ToggleTopicVisibility,
  UpdateTask,
  UpdateTopic,
} from './matrix.actions';
import { MatrixState, Task, Topic } from './matrix.interfaces';
import { initialState } from './matrix.reducers';
import { MatrixService } from './matrix.service';

describe('MatrixService', () => {
  let store: MockStore<MatrixState>;
  let service: MatrixService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.get<Store<MatrixState>>(Store);
    service = TestBed.get(MatrixService);
  }));

  it('should create the matrix service', () => {
    expect(service).toBeTruthy();
  });

  describe('dispatch', () => {
    let dispatchSpy: jasmine.Spy;

    beforeEach(() => {
      dispatchSpy = spyOn(store, 'dispatch');
    });

    describe('getData', () => {
      let action: Action;

      beforeEach(() => {
        action = new GetMatrixData();
      });

      it('should dispatch GetMatrixData action to store', () => {
        service.getData();
        expect(dispatchSpy).toHaveBeenCalledWith(action);
      });
    });

    describe('updateTask', () => {
      it('should dispatch UpdateTask action with task to store', () => {
        const task = new Task(1, 'test', 1, 1);
        const action = new UpdateTask(task);
        service.updateTask(task);
        expect(dispatchSpy).toHaveBeenCalledWith(action);
      });
    });

    describe('deleteTask', () => {
      it('should dispatch DeleteTask action with id to store', () => {
        const id = 1;
        const action = new DeleteTask(id);
        service.deleteTask(id);
        expect(dispatchSpy).toHaveBeenCalledWith(action);
      });
    });

    describe('toggleTopicVisibility', () => {
      it('should dispatch ToggleTopicVisibility with id to store', () => {
        const id = 34;
        const action = new ToggleTopicVisibility(id);
        service.toggleTopicVisibility(id);
        expect(dispatchSpy).toHaveBeenCalledWith(action);
      });
    });

    describe('updateTopic', () => {
      it('should dispatch UpdateTopic with topic to store', () => {
        const topic = new Topic(1, 'Test', Color.orange, true, false);
        const action = new UpdateTopic(topic);
        service.updateTopic(topic);
        expect(dispatchSpy).toHaveBeenCalledWith(action);
      });
    });
  });

  describe('selectTopics', () => {});

  describe('selectIsLoading', () => {});

  describe('selectErrorMessage', () => {});

  describe('selectTasks', () => {});

  describe('selectTopicById', () => {});
});
