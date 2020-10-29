import { createAction, props } from '@ngrx/store';
import { Topic, Task } from './matrix.interfaces';

export const getMatrixData = createAction(
  '[MATRIX] get all matrix data from sever',
);
export const getMatrixDataSuccess = createAction(
  '[MATRIX] successfully got all matrix data',
  props<{ topics: Topic[] }>(),
);
export const getMatrixDataFailed = createAction(
  '[MATRIX] failed to get all matrix data',
  props<{ message: string }>(),
);

export const toggleTopicVisibility = createAction(
  '[MATRIX] toggle topic visibility on or off',
  props<{ topicId: number }>(),
);

export const updateTask = createAction(
  '[MATRIX] update this task',
  props<{ task: Task }>(),
);
export const updateTaskSuccess = createAction(
  '[MATRIX] successfully updated task',
  props<{ task: Task }>(),
);
export const updateTaskFailed = createAction(
  '[MATRIX] failed to update task',
  props<{ message: string }>(),
);

export const deleteTask = createAction(
  '[MATRIX] delete this task',
  props<{ taskId: number }>(),
);
export const deleteTaskSuccess = createAction(
  '[MATRIX] successfully deleted task',
  props<{ task: Task }>(),
);
export const deleteTaskFailed = createAction(
  '[MATRIX] failed to delete task',
  props<{ message: string }>(),
);

export const updateTopic = createAction(
  '[MATRIX] update this topic',
  props<{ topic: Partial<Topic> }>(),
);
export const updateTopicSuccess = createAction(
  '[MATRIX] successfully updated topic',
  props<{ topic: Partial<Topic> }>(),
);
export const updateTopicFailed = createAction(
  '[MATRIX] failed to update topic',
  props<{ message: string }>(),
);
