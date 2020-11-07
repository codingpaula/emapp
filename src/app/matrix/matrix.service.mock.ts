import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MatrixService, Task, Topic } from './matrix.interfaces';

@Injectable()
export class MatrixMockService implements MatrixService {
  getData(): void {}
  updateTask(task: Task): void {}
  deleteTask(taskId: number): void {}
  toggleTopicVisibility(topicId: number): void {}
  updateTopic(topic: Topic): void {}
  selectTopics(): Observable<Topic[]> {
    return of([new Topic(1, 'Test', '#121212', true, false)]);
  }
}
