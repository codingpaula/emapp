import { Action, createAction, props } from '@ngrx/store';
import { MatrixData, Task, Topic } from './matrix.interfaces';

export const GET_MATRIX_DATA = '[MATRIX] get all matrix data from sever';
export const GET_MATRIX_DATA_SUCCESS =
  '[MATRIX] successfully got all matrix data';
export const GET_MATRIX_DATA_FAILED = '[MATRIX] failed to get all matrix data';

export const UPDATE_TASK = '[MATRIX] update this task';
export const UPDATE_TASK_SUCCESS = '[MATRIX] successfully updated task';
export const UPDATE_TASK_FAILED = '[MATRIX] failed to update task';

export const DELETE_TASK = '[MATRIX] delete this task';
export const DELETE_TASK_SUCCESS = '[MATRIX] successfully deleted task';
export const DELETE_TASK_FAILED = '[MATRIX] failed to delete task';

export const ADD_TOPIC = '[MATRIX] add new topic';
export const ADD_TOPIC_SUCCESS = '[MATRIX] successfully added topic';
export const ADD_TOPIC_FAILED = '[MATRIX] failed to add topic';

export const UPDATE_TOPIC = '[MATRIX] update this topic';
export const UPDATE_TOPIC_SUCCESS = '[MATRIX] successfully updated topic';
export const UPDATE_TOPIC_FAILED = '[MATRIX] failed to update topic';

export const TOGGLE_TOPIC_VISIBLITY =
  '[MATRIX] toggle topic visibility on or off';

export class GetMatrixData implements Action {
  readonly type = GET_MATRIX_DATA;
}

export class GetMatrixDataSuccess implements Action {
  readonly type = GET_MATRIX_DATA_SUCCESS;
  constructor(public data: MatrixData) {}
}

export class GetMatrixDataFailed implements Action {
  readonly type = GET_MATRIX_DATA_FAILED;
  constructor(public message: string) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;
  constructor(public task: Task) {}
}

export class UpdateTaskSuccess implements Action {
  readonly type = UPDATE_TASK_SUCCESS;
  constructor(public task: Task) {}
}

export class UpdateTaskFailed implements Action {
  readonly type = UPDATE_TASK_FAILED;
  constructor(public message: string) {}
}

export class DeleteTask implements Action {
  readonly type = DELETE_TASK;
  constructor(public taskId: number) {}
}

export class DeleteTaskSuccess implements Action {
  readonly type = DELETE_TASK_SUCCESS;
  constructor(public task: Task) {}
}

export class DeleteTaskFailed implements Action {
  readonly type = DELETE_TASK_FAILED;
  constructor(public message: string) {}
}

export class AddTopic implements Action {
  readonly type = ADD_TOPIC;
}

export class AddTopicSuccess implements Action {
  readonly type = ADD_TOPIC_SUCCESS;
  constructor(public topic: Topic) {}
}

export class AddTopicFailed implements Action {
  readonly type = ADD_TOPIC_FAILED;
  constructor(public message: string) {}
}

export class UpdateTopic implements Action {
  readonly type = UPDATE_TOPIC;
  constructor(public topic: Topic) {}
}

export class UpdateTopicSuccess implements Action {
  readonly type = UPDATE_TOPIC_SUCCESS;
  constructor(public topic: Topic) {}
}

export class UpdateTopicFailed implements Action {
  readonly type = UPDATE_TOPIC_FAILED;
  constructor(public message: string) {}
}

export class ToggleTopicVisibility implements Action {
  readonly type = TOGGLE_TOPIC_VISIBLITY;
  constructor(public topicId: number) {}
}

export type MatrixAction =
  | GetMatrixData
  | GetMatrixDataSuccess
  | GetMatrixDataFailed
  | UpdateTask
  | UpdateTaskSuccess
  | UpdateTaskFailed
  | DeleteTask
  | DeleteTaskSuccess
  | DeleteTaskFailed
  | AddTopic
  | AddTopicSuccess
  | AddTopicFailed
  | UpdateTopic
  | UpdateTopicSuccess
  | UpdateTopicFailed
  | ToggleTopicVisibility;
