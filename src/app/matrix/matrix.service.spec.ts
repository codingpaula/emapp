import { TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Color } from '../shared/color.interfaces';
import {
  DeleteTask,
  GetMatrixData,
  ToggleTopicVisibility,
  UpdateTask,
  UpdateTopic,
} from './matrix.actions';
import { Task, Topic } from './matrix.interfaces';
import { initialState, MatrixState } from './matrix.reducers';
import { MatrixService } from './matrix.service';

describe('MatrixService', () => {
  let store: MockStore<MatrixState>;
  let service: MatrixService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [provideMockStore({ initialState })],
      }).compileComponents();

      store = TestBed.get<Store<MatrixState>>(Store);
      service = TestBed.get(MatrixService);
    }),
  );

  it('should create the matrix service', () => {
    expect(service).toBeTruthy();
  });

  describe('select', () => {
    xit('selectTopics - should select topics from store', (done) => {
      const testTopic: Topic = {
        id: 1,
        name: 'Test',
        color: Color.green,
        visible: true,
        deleted: false,
      };
      store.overrideSelector('selectMatrixTopics', [testTopic]);
      service.selectTopics().subscribe((result) => {
        expect(result).toEqual([testTopic]);
        done();
      });
    });

    it('selectTasks - should select tasks from store', () => {});

    it('selectActiveTasks - should select active tasks from store', () => {});

    it('selectDoneTasks - should select done tasks from store', () => {});

    it('selectTasksByTopics - should select tasks by topics from store', () => {});
  });

  describe('selectIsLoading', () => {});

  describe('selectErrorMessage', () => {});

  describe('selectTasks', () => {});

  describe('selectTopicById', () => {});
});
