import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.state';
import { Color } from 'src/app/shared/color.interfaces';
import { Task, TaskDictionary, Topic } from '../matrix.interfaces';
import { selectTask } from '../matrix.actions';
import { initialState, MatrixState } from '../matrix.reducers';
import {
  selectMatrixActiveTasksByTopics,
  selectMatrixTopics,
} from '../matrix.selectors';
import { TaskDotMockComponent } from '../task-dot/task-dot.component.mock';
import { XPositionMockPipe } from '../x-position.pipe.mock';
import { YPositionMockPipe } from '../y-position.pipe.mock';
import { CanvasComponent } from './canvas.component';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;
  let canvas: any;
  let store: MockStore<MatrixState>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          CanvasComponent,
          TaskDotMockComponent,
          XPositionMockPipe,
          YPositionMockPipe,
        ],
        providers: [[provideMockStore({ initialState })]],
      }).compileComponents();

      fixture = TestBed.createComponent(CanvasComponent);
      component = fixture.componentInstance;
      canvas = fixture.debugElement.componentInstance;
      store = TestBed.inject(MockStore);
    }),
  );

  it('should create the canvas', () => {
    expect(canvas).toBeTruthy();
  });

  describe('ngOnInit', () => {
    let mockSelectActiveTasks: MemoizedSelector<AppState, TaskDictionary>;
    let mockSelectTopics: MemoizedSelector<AppState, Topic[]>;

    beforeEach(() => {
      mockSelectActiveTasks = store.overrideSelector(
        selectMatrixActiveTasksByTopics,
        {},
      );
      mockSelectTopics = store.overrideSelector(selectMatrixTopics, []);
    });

    it('should subscribe to active tasks by topics', () => {
      // arrange
      const testDictionary: TaskDictionary = {
        1: [
          {
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
          },
        ],
      };
      mockSelectActiveTasks.setResult(testDictionary);
      store.refreshState();
      // act
      component.ngOnInit();
      // assert
      expect(component.tasks).toEqual(testDictionary);
    });

    it('should subscribe to topics', () => {
      // arrange
      const testTopics: Topic[] = [
        {
          id: 1,
          name: 'test1',
          color: Color.green,
          visible: true,
          deleted: false,
        },
        {
          id: 2,
          name: 'test2',
          color: Color.blue,
          visible: true,
          deleted: false,
        },
      ];
      mockSelectTopics.setResult(testTopics);
      store.refreshState();
      // act
      component.ngOnInit();
      // assert
      expect(component.topics).toEqual(testTopics);
    });
  });

  it('should dispatch selectTask on selecting task', () => {
    // arrange
    const dispatchSpy = spyOn(store, 'dispatch');
    const testTask: Task = {
      id: 12345,
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
    // act
    component.onSelectTask(testTask);
    //
    expect(dispatchSpy).toHaveBeenCalledWith(
      selectTask({ currentTaskId: testTask.id }),
    );
  });
});
