import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DropdownMockComponent } from '../dropdown/dropdown.component.mock';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCardComponent, DropdownMockComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
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
  }));

  it('should create task card', () => {
    expect(component).toBeTruthy();
  });
});
