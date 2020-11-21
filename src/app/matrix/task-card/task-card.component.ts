import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Task, Topic } from '../matrix.interfaces';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() topic!: Topic;
  @Input() position = 0;
  @Output() changeTask = new EventEmitter<Task>();
  taskForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    importance: new FormControl(''),
    dueDate: new FormGroup({
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
    }),
    topic: new FormControl(''),
    done: new FormControl(''),
  });

  onChange(task: Task): void {
    this.changeTask.emit(task);
  }
}
