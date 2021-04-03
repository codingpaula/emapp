import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.state';
import { Color } from '../../shared/color.interfaces';
import { deleteTask, toggleDoneTask, updateTask } from '../matrix.actions';
import { DropdownItem, Task, Topic } from '../matrix.interfaces';
import { initialState, MatrixState } from '../matrix.reducers';
import {
  selectCurrentTaskHistory,
  selectMatrixTopics,
  selectMatrixTopicsDropdownItems,
} from '../matrix.selectors';
import { TaskCardMockComponent } from '../task-card/task-card.component.mock';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let detail: any;
  let store: MockStore<MatrixState>;
  let mockSelectMatrixTopicsDropdownItems: MemoizedSelector<
    AppState,
    DropdownItem[]
  >;
  let mockSelectCurrentTaskHistory: MemoizedSelector<AppState, Task[]>;
  let mockSelectTopics: MemoizedSelector<AppState, Topic[]>;
  let dispatchSpy: jasmine.Spy;

  let testTask: Task;
  let testTopic: Topic;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DetailComponent, TaskCardMockComponent],
        providers: [[provideMockStore({ initialState })]],
      }).compileComponents();

      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
      detail = fixture.debugElement.componentInstance;
      store = TestBed.inject(MockStore);
    }),
  );

  beforeEach(() => {
    testTask = {
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
    testTopic = {
      id: 1,
      name: 'test',
      color: Color.green,
      visible: true,
      deleted: false,
    };
    mockSelectMatrixTopicsDropdownItems = store.overrideSelector(
      selectMatrixTopicsDropdownItems,
      [],
    );
    mockSelectTopics = store.overrideSelector(selectMatrixTopics, []);
    mockSelectCurrentTaskHistory = store.overrideSelector(
      selectCurrentTaskHistory,
      [],
    );
    dispatchSpy = spyOn(store, 'dispatch');
  });

  it('should create the detail', () => {
    expect(detail).toBeTruthy();
  });

  it('changeTask - should use matrix service to update task', () => {
    // arrange
    // act
    component.changeTask(testTask);
    // assert
    expect(dispatchSpy).toHaveBeenCalledWith(updateTask({ task: testTask }));
  });

  it('deleteTask - should use matrix service to delete task', () => {
    // arrange
    // act
    component.deleteTask(testTask.id);
    // assert
    expect(dispatchSpy).toHaveBeenCalledWith(
      deleteTask({ taskId: testTask.id }),
    );
  });

  it('toggleDoneTask - should use matrix service to toggle task done', () => {
    // arrange
    // act
    component.toggleDoneTask(testTask.id);
    // assert
    expect(dispatchSpy).toHaveBeenCalledWith(
      toggleDoneTask({ taskId: testTask.id }),
    );
  });

  describe('ngOnInit', () => {
    it('should subscribe to task history on init', () => {
      // arrange
      mockSelectCurrentTaskHistory.setResult([testTask]);
      // act
      component.ngOnInit();
      // assert
      expect(component.taskHistory).toEqual([testTask]);
    });

    it('should subscribe to topics on init', () => {
      // arrange
      mockSelectTopics.setResult([testTopic]);
      // act
      component.ngOnInit();
      // assert
      expect(component.topics).toEqual({ [1]: testTopic });
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next on unsubscribe$', () => {
      // arrange
      const nextSpy = spyOn(component.unsubscribe$, 'next');
      // act
      component.ngOnDestroy();
      // assert
      expect(nextSpy).toHaveBeenCalled();
    });

    it('should call complete on onsubscribe$', () => {
      // arrange
      const completeSpy = spyOn(component.unsubscribe$, 'complete');
      // act
      component.ngOnDestroy();
      // assert
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
