import { async, TestBed } from '@angular/core/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
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

fdescribe('MatrixService', () => {
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

    it('getData - should dispatch GetMatrixData action to store', () => {
      const action = new GetMatrixData();
      service.getData();
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });

    it('updateTask - should dispatch UpdateTask action with task to store', () => {
      const task = new Task(1, 'test', 1, 1, 1, 12, 20);
      const action = new UpdateTask(task);
      service.updateTask(task);
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });

    it('deleteTask - should dispatch DeleteTask action with id to store', () => {
      const id = 1;
      const action = new DeleteTask(id);
      service.deleteTask(id);
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });

    it('toggleTopicVisibility - should dispatch ToggleTopicVisibility with id to store', () => {
      const id = 34;
      const action = new ToggleTopicVisibility(id);
      service.toggleTopicVisibility(id);
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });

    it('updateTopic - should dispatch UpdateTopic with topic to store', () => {
      const topic = new Topic(1, 'Test', Color.orange, true, false);
      const action = new UpdateTopic(topic);
      service.updateTopic(topic);
      expect(dispatchSpy).toHaveBeenCalledWith(action);
    });
  });

  describe('select', () => {
    it('selectTopics - should select topics from store', (done) => {
      const testTopic = new Topic(1, 'Test', Color.green, true, false);
      store.overrideSelector('selectMatrixTopics', [testTopic]);
      service.selectTopics().subscribe((result) => {
        expect(result).toEqual([testTopic]);
        done();
      });
    });
  });

  describe('selectIsLoading', () => {});

  describe('selectErrorMessage', () => {});

  describe('selectTasks', () => {});

  describe('selectTopicById', () => {});
});
