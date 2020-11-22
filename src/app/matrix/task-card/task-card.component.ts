import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Task, TopicDictionary } from '../matrix.interfaces';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  @Input() topicsForSelect: TopicDictionary = {};
  @Input() position = 0;
  @Output() changeTask = new EventEmitter<Task>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group(this.task);
    this.taskForm.valueChanges
      .pipe(
        debounceTime(500),
        map((change: Task) => {
          console.log(change);
          if (change) {
            this.changeTask.emit(change);
            return change;
          }
        }),
      )
      .subscribe();
  }

  onChange(task: Task): void {
    this.changeTask.emit(task);
  }
}
