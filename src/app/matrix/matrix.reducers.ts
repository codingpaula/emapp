import { Action } from '@ngrx/store';
import produce from 'immer';
import {
  ADD_TOPIC,
  ADD_TOPIC_FAILED,
  ADD_TOPIC_SUCCESS,
  GET_MATRIX_DATA,
  GET_MATRIX_DATA_FAILED,
  GET_MATRIX_DATA_SUCCESS,
  MatrixAction,
  SELECT_TASK,
  TOGGLE_TOPIC_VISIBLITY,
  UPDATE_TASK,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_SUCCESS,
  UPDATE_TOPIC,
  UPDATE_TOPIC_FAILED,
  UPDATE_TOPIC_SUCCESS,
} from './matrix.actions';
import { MatrixState, Task, TaskDictionary } from './matrix.interfaces';

export const initialState: MatrixState = {
  topics: [],
  tasks: {},
  taskHistory: [],
  isLoading: false,
  errorMessage: undefined,
};

export function matrixReducer(state = initialState, action: Action) {
  return produce((draft: MatrixState, matrixAction: MatrixAction) => {
    switch (matrixAction.type) {
      // === loading cases ===
      case GET_MATRIX_DATA:
      case UPDATE_TASK:
      case UPDATE_TOPIC:
      case ADD_TOPIC:
        draft.isLoading = true;
        draft.errorMessage = undefined;
        return;
      // === failed cases ===
      case GET_MATRIX_DATA_FAILED:
      case UPDATE_TASK_FAILED:
      case UPDATE_TOPIC_FAILED:
      case ADD_TOPIC_FAILED:
        draft.isLoading = false;
        draft.errorMessage = matrixAction.message;
        return;
      // === success cases ===
      case GET_MATRIX_DATA_SUCCESS:
        draft.topics = matrixAction.data.topics;
        draft.tasks = createTaskDictionary(matrixAction.data.tasks);
        setUnloading(draft);
        return;
      case UPDATE_TASK_SUCCESS:
        const taskIndex = draft.tasks[matrixAction.task.topic].findIndex(
          (task) => task.id === matrixAction.task.id,
        );
        if (taskIndex > -1) {
          draft.tasks[matrixAction.task.topic][taskIndex] = matrixAction.task;
        }
        setUnloading(draft);
        return;
      case ADD_TOPIC_SUCCESS:
        draft.topics.push(matrixAction.topic);
        setUnloading(draft);
        return;
      case UPDATE_TOPIC_SUCCESS:
        const topicIndex = draft.topics.findIndex(
          (topic) => topic.id === matrixAction.topic.id,
        );
        if (topicIndex > -1) {
          draft.topics[topicIndex] = matrixAction.topic;
        }
        setUnloading(draft);
        return;
      // === frontend only actions ===
      case SELECT_TASK:
        console.log(matrixAction.currentTask);
        const alreadyInHistory = draft.taskHistory.findIndex(
          (t) => t.taskId === matrixAction.currentTask.taskId,
        );
        if (alreadyInHistory > -1) {
          draft.taskHistory.splice(alreadyInHistory, 1);
        }
        draft.taskHistory.unshift(matrixAction.currentTask);
        if (draft.taskHistory.length > 6) {
          draft.taskHistory.pop();
        }
        return;
      case TOGGLE_TOPIC_VISIBLITY:
        const topicIdx = draft.topics.findIndex(
          (topic) => topic.id === matrixAction.topicId,
        );
        if (topicIdx > -1) {
          draft.topics[topicIdx].toggleVisibility();
        }
        return;
    }
  })(state, action as MatrixAction);
}

const setUnloading = (draft: MatrixState): void => {
  draft.isLoading = false;
  draft.errorMessage = undefined;
};

const createTaskDictionary = (tasks: Task[]): TaskDictionary => {
  const dict: TaskDictionary = {};
  tasks.forEach((task) => {
    if (dict[task.topic]) {
      dict[task.topic].push(task);
    } else {
      dict[task.topic] = [task];
    }
  });
  console.log(dict);
  return dict;
};
