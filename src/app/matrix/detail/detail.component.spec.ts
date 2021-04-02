import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Color } from '../../shared/color.interfaces';
import { DropdownItem, Task, Topic } from '../matrix.interfaces';
import { initialState, MatrixState } from '../matrix.reducers';
import { selectMatrixTopicsDropdownItems } from '../matrix.selectors';
import { MatrixService } from '../matrix.service';
import { MatrixMockService } from '../matrix.service.mock';
import { TaskCardMockComponent } from '../task-card/task-card.component.mock';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let detail: any;
  let service: MatrixService;
  let store: MockStore<MatrixState>;
  let mockSelectMatrixTopicsDropdownItems: MemoizedSelector<
    any,
    DropdownItem[]
  >;

  let testTask: Task;
  let testTopic: Topic;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DetailComponent, TaskCardMockComponent],
        providers: [
          {
            provide: MatrixService,
            useClass: MatrixMockService,
          },
          [provideMockStore({ initialState })],
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(DetailComponent);
      component = fixture.componentInstance;
      detail = fixture.debugElement.componentInstance;
      service = TestBed.inject(MatrixService);
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
  });

  it('should create the detail', () => {
    expect(detail).toBeTruthy();
  });

  xit('changeTask - should use matrix service to update task', () => {
    // TODO
    // arrange
    // const matrixServiceSpy = spyOn(service, 'updateTask');
    // act
    // component.changeTask(testTask);
    // assert
    // expect(matrixServiceSpy).toHaveBeenCalledWith(testTask);
  });

  xit('deleteTask - should use matrix service to delete task', () => {
    // TODO
    // arrange
    // const matrixServiceSpy = spyOn(service, 'deleteTask');
    // act
    // component.deleteTask(testTask.id);
    // assert
    // expect(matrixServiceSpy).toHaveBeenCalledWith(testTask.id);
  });

  xit('toggleDoneTask - should use matrix service to toggle task done', () => {
    // TODO
    // arrange
    // const matrixServiceSpy = spyOn(service, 'toggleTaskDone');
    // act
    // component.toggleDoneTask(testTask.id);
    // assert
    // expect(matrixServiceSpy).toHaveBeenCalledWith(testTask.id);
  });

  describe('ngOnInit', () => {
    it('should subscribe to task history on init', () => {
      // arrange
      const matrixServiceSpy = spyOn(
        service,
        'selectCurrentTaskHistory',
      ).and.returnValue(of([{ ...testTask }]));
      // act
      component.ngOnInit();
      // assert
      expect(matrixServiceSpy).toHaveBeenCalled();
    });

    it('should set task history to variable task history', () => {
      // arrange
      spyOn(service, 'selectCurrentTaskHistory').and.returnValue(
        of([{ ...testTask }]),
      );
      // act
      component.ngOnInit();
      // assert
      expect(component.taskHistory).toEqual([testTask]);
    });

    it('should subscribe to topics on init', () => {
      // arrange
      const matrixServiceSpy = spyOn(service, 'selectTopics').and.returnValue(
        of([{ ...testTopic }]),
      );
      // act
      component.ngOnInit();
      // assert
      expect(matrixServiceSpy).toHaveBeenCalled();
    });

    it('should set topics to variable topics as dictionary', () => {
      // arrange
      spyOn(service, 'selectTopics').and.returnValue(of([{ ...testTopic }]));
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
