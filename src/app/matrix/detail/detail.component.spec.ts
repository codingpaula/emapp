import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Color } from '../../shared/color.interfaces';
import { Task, Topic } from '../matrix.interfaces';
import { MatrixService } from '../matrix.service';
import { MatrixMockService } from '../matrix.service.mock';
import { TaskCardMockComponent } from '../task-card/task-card.component.mock';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let detail: any;
  let service: MatrixService;

  let testTask: Task;
  let testTopic: Topic;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent, TaskCardMockComponent],
      providers: [
        {
          provide: MatrixService,
          useClass: MatrixMockService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    detail = fixture.debugElement.componentInstance;
    service = TestBed.get(MatrixService);
  }));

  beforeEach(() => {
    testTask = new Task(1, 'test', 1, 1, 1, 1, 21);
    testTopic = new Topic(1, 'test', Color.green, true, false);
  });

  it('should create the detail', () => {
    expect(detail).toBeTruthy();
  });

  it('changeTask - should use matrix service to update task', () => {
    // arrange
    const matrixServiceSpy = spyOn(service, 'updateTask');
    // act
    component.changeTask(testTask);
    // assert
    expect(matrixServiceSpy).toHaveBeenCalledWith(testTask);
  });

  describe('ngOnInit', () => {
    it('should subscribe to task history on init', () => {
      // arrange
      const matrixServiceSpy = spyOn(
        service,
        'selectCurrentTaskHistory',
      ).and.returnValue(of([{} as Task]));
      // act
      component.ngOnInit();
      // assert
      expect(matrixServiceSpy).toHaveBeenCalled();
    });

    it('should set task history to variable task history', () => {
      // arrange
      spyOn(service, 'selectCurrentTaskHistory').and.returnValue(
        of([testTask]),
      );
      // act
      component.ngOnInit();
      // assert
      expect(component.taskHistory).toEqual([testTask]);
    });

    it('should subscribe to topics on init', () => {
      // arrange
      const matrixServiceSpy = spyOn(service, 'selectTopics').and.returnValue(
        of([{} as Topic]),
      );
      // act
      component.ngOnInit();
      // assert
      expect(matrixServiceSpy).toHaveBeenCalled();
    });

    it('should set topics to variable topics as dictionary', () => {
      // arrange
      spyOn(service, 'selectTopics').and.returnValue(of([testTopic]));
      // act
      component.ngOnInit();
      // assert
      expect(component.topics).toEqual({ [1]: testTopic });
    });
  });
});
