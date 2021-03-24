import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { DropdownItem, Task } from '../matrix.interfaces';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Input() color!: string;
  @Input() position = 0;
  @Input() topicOptions: DropdownItem[] = [];
  @Output() changeTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleDoneTask = new EventEmitter<number>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: this.task.name,
      description: this.task.description,
      importance: this.task.importance,
      dueDay: this.task.dueDay,
      dueMonth: this.task.dueMonth,
      dueYear: this.task.dueYear,
      topic: this.task.topic,
    });
    this.taskForm.valueChanges
      .pipe(
        debounceTime(500),
        map((change: Task) => {
          if (change) {
            var updatedTask = { ...this.task };
            updatedTask = { ...updatedTask, ...change };
            this.changeTask.emit(updatedTask);
            return change;
          }
        }),
      )
      .subscribe();
  }

  onDeleteTask(): void {
    this.deleteTask.emit(this.task.id);
  }

  onDone(): void {
    this.toggleDoneTask.emit(this.task.id);
  }
}
