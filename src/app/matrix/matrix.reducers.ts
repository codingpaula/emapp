import produce from 'immer';
import {
  GET_MATRIX_DATA,
  GET_MATRIX_DATA_FAILED,
  GET_MATRIX_DATA_SUCCESS,
  MatrixAction,
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
  isLoading: false,
  errorMessage: undefined,
};

export const matrixReducer = produce(
  (draft: MatrixState, action: MatrixAction) => {
    switch (action.type) {
      // === loading cases ===
      case GET_MATRIX_DATA:
      case UPDATE_TASK:
      case UPDATE_TOPIC:
        draft.isLoading = true;
        draft.errorMessage = undefined;
        return;
      // === failed cases ===
      case GET_MATRIX_DATA_FAILED:
      case UPDATE_TASK_FAILED:
      case UPDATE_TOPIC_FAILED:
        draft.isLoading = false;
        draft.errorMessage = action.message;
        return;
      // === success cases ===
      case GET_MATRIX_DATA_SUCCESS:
        draft.topics = action.data.topics;
        draft.tasks = createTaskDictionary(action.data.tasks);
        setUnloading(draft);
        return;
      case UPDATE_TASK_SUCCESS:
        const taskIndex = draft.tasks[action.task.topic].findIndex(
          (task) => task.id === action.task.id,
        );
        if (taskIndex > -1) {
          draft.tasks[action.task.topic][taskIndex] = action.task;
        }
        setUnloading(draft);
        return;
      case UPDATE_TOPIC_SUCCESS:
        const topicIndex = draft.topics.findIndex(
          (topic) => topic.id === action.topic.id,
        );
        if (topicIndex > -1) {
          draft.topics[topicIndex] = action.topic;
        }
        setUnloading(draft);
        return;
      // === frontend only actions ===
      case TOGGLE_TOPIC_VISIBLITY:
        draft.topics
          .find((topic) => topic.id === action.topicId)
          .toggleVisibility();
        return;
    }
  },
  initialState,
);

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
  return dict;
};
