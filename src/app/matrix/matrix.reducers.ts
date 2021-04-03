import { Action, createReducer, on } from '@ngrx/store';
import { cloneDeep, findIndex, pull } from 'lodash';
import { RequestStatus } from '../shared/request-status.interface';
import * as MatrixActions from './matrix.actions';
import { Task, Topic } from './matrix.interfaces';

export interface MatrixState {
  topics: Topic[];
  tasks: Task[];
  taskHistory: number[];
  requestStatus: RequestStatus;
}

export const matrixFeatureKey = 'matrix';

export const initialState: MatrixState = {
  topics: [],
  tasks: [],
  taskHistory: [],
  requestStatus: {
    isLoading: false,
    errorMessage: undefined,
  },
};

export function matrixReducer(
  state: MatrixState | undefined = initialState,
  action: Action,
): MatrixState {
  return {
    topics: topicsReducer(state.topics, action),
    tasks: tasksReducer(state.tasks, action),
    taskHistory: taskHistoryReducer(state.taskHistory, action),
    requestStatus: requestStatusReducer(state.requestStatus, action),
  };
}

const topicsReducer = createReducer(
  initialState.topics,
  on(MatrixActions.getMatrixDataSuccess, (state, { data }) => data.topics),
  on(MatrixActions.addTopicSuccess, (state, { topic }) => [
    ...cloneDeep(state),
    topic,
  ]),
  on(MatrixActions.updateTopicSuccess, (state, { topic }) => {
    const topicIndex = findIndex(state, { id: topic.id });
    if (topicIndex > -1) {
      var newTopics = [...cloneDeep(state)];
      newTopics[topicIndex] = topic;
      return newTopics;
    }
    return state;
  }),
  on(MatrixActions.toggleTopicVisibility, (state, { topicId }) => {
    const topicIdx = findIndex(state, { id: topicId });
    if (topicIdx > -1) {
      var toggleTopics = [...cloneDeep(state)];
      toggleTopics[topicIdx].visible = !toggleTopics[topicIdx].visible;
      return toggleTopics;
    }
    return state;
  }),
);

const tasksReducer = createReducer(
  initialState.tasks,
  on(MatrixActions.getMatrixDataSuccess, (state, { data }) => data.tasks),
  on(
    MatrixActions.updateTaskSuccess,
    MatrixActions.deleteTaskSuccess,
    (state, { task }) => {
      const taskIdx = findIndex(state, { id: task.id });
      if (taskIdx > -1) {
        var newTasks = [...cloneDeep(state)];
        newTasks[taskIdx] = task;
        return newTasks;
      }
      return state;
    },
  ),
  on(MatrixActions.toggleDoneTask, (state, { taskId }) => {
    const taskIdx = findIndex(state, { id: taskId });
    if (taskIdx > -1) {
      var toggleTasks = [...cloneDeep(state)];
      toggleTasks[taskIdx].done = !toggleTasks[taskIdx].done;
      return toggleTasks;
    }
    return state;
  }),
);

const taskHistoryReducer = createReducer(
  initialState.taskHistory,
  on(MatrixActions.deleteTaskSuccess, (state, { task }) =>
    pull(cloneDeep(state), task.id),
  ),
  on(MatrixActions.selectTask, (state, { currentTaskId }) => {
    var newHistory = pull(cloneDeep(state), currentTaskId);
    newHistory.unshift(currentTaskId);
    if (newHistory.length > 6) {
      newHistory.pop();
    }
    return newHistory;
  }),
);

const requestStatusReducer = createReducer(
  initialState.requestStatus,
  on(
    MatrixActions.getMatrixData,
    MatrixActions.updateTask,
    MatrixActions.deleteTask,
    MatrixActions.updateTopic,
    MatrixActions.addTopic,
    (state) => ({ isLoading: true, errorMessage: undefined }),
  ),
  on(
    MatrixActions.getMatrixDataFailed,
    MatrixActions.updateTaskFailed,
    MatrixActions.deleteTaskFailed,
    MatrixActions.updateTopicFailed,
    MatrixActions.addTopicFailed,
    (state, { message }) => ({ isLoading: false, errorMessage: message }),
  ),
  on(
    MatrixActions.getMatrixDataSuccess,
    MatrixActions.updateTaskSuccess,
    MatrixActions.deleteTaskSuccess,
    MatrixActions.addTopicSuccess,
    MatrixActions.updateTopicSuccess,
    (state) => ({ isLoading: false, errorMessage: undefined }),
  ),
);
