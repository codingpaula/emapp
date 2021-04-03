import { createAction, props } from '@ngrx/store';
import { MatrixData, Task, Topic } from './matrix.interfaces';

export const getMatrixData = createAction(
  '[MATRIX] get all matrix data from sever',
);

export const getMatrixDataSuccess = createAction(
  '[MATRIX] successfully got all matrix data',
  props<{ data: MatrixData }>(),
);

export const getMatrixDataFailed = createAction(
  '[MATRIX] failed to get all matrix data',
  props<{ message: string }>(),
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

export const toggleDoneTask = createAction(
  '[MATRIX] toggle task done',
  props<{ taskId: number }>(),
);

export const toggleDoneTaskSuccess = createAction(
  '[MATRIX] successfully toggled task done',
  props<{ task: Task }>(),
);

export const toggleDoneTaskFailed = createAction(
  '[MATRIX] failed to toggle task done',
  props<{ message: string }>(),
);

export const addTopic = createAction('[MATRIX] add new topic');

export const addTopicSuccess = createAction(
  '[MATRIX] successfully added topic',
  props<{ topic: Topic }>(),
);

export const addTopicFailed = createAction(
  '[MATRIX] failed to add topic',
  props<{ message: string }>(),
);

export const updateTopic = createAction(
  '[MATRIX] update this topic',
  props<{ topic: Topic }>(),
);

export const updateTopicSuccess = createAction(
  '[MATRIX] successfully updated topic',
  props<{ topic: Topic }>(),
);

export const updateTopicFailed = createAction(
  '[MATRIX] failed to update topic',
  props<{ message: string }>(),
);

export const selectTask = createAction(
  '[MATRIX] select a task to why details',
  props<{ currentTaskId: number }>(),
);

export const toggleTopicVisibility = createAction(
  '[MATRIX] toggle topic visibility on or off',
  props<{ topicId: number }>(),
);
