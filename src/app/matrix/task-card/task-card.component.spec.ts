import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  const formBuilder: UntypedFormBuilder = new UntypedFormBuilder();

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TaskCardComponent],
        imports: [ReactiveFormsModule],
        providers: [{ provide: UntypedFormBuilder, useValue: formBuilder }],
      }).compileComponents();

      fixture = TestBed.createComponent(TaskCardComponent);
      component = fixture.componentInstance;

      component.taskForm = formBuilder.group({
        name: null,
        description: null,
        impDueDate: formBuilder.group({
          importance: null,
          dueDay: null,
          dueMonth: null,
          dueYear: null,
        }),
        selectedTopic: formBuilder.group({
          topic: null,
        }),
      });
    }),
  );

  it('should create task card', () => {
    expect(component).toBeTruthy();
  });
});
