import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDictionary } from '../matrix.interfaces';
import { TaskDotComponent } from './task-dot.component';

describe('TaskDotComponent', () => {
  let component: TaskDotComponent;
  let fixture: ComponentFixture<TaskDotComponent>;
  let taskDot: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDotComponent);
    component = fixture.componentInstance;
    taskDot = fixture.debugElement.componentInstance;
  }));

  it('should create the task dot', () => {
    expect(taskDot).toBeTruthy();
  });
});
