import { RequestStatus } from '../shared/request-status.interface';
import {
  ADD_TOPIC,
  ADD_TOPIC_FAILED,
  ADD_TOPIC_SUCCESS,
  DELETE_TASK,
  DELETE_TASK_FAILED,
  DELETE_TASK_SUCCESS,
  GET_MATRIX_DATA,
  GET_MATRIX_DATA_FAILED,
  GET_MATRIX_DATA_SUCCESS,
  MatrixAction,
  SELECT_TASK,
  TOGGLE_TASK_DONE,
  TOGGLE_TASK_DONE_FAILED,
  TOGGLE_TASK_DONE_SUCCESS,
  TOGGLE_TOPIC_VISIBLITY,
  UPDATE_TASK,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_SUCCESS,
  UPDATE_TOPIC,
  UPDATE_TOPIC_FAILED,
  UPDATE_TOPIC_SUCCESS,
} from './matrix.actions';
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

export const matrixReducer = (
  state: MatrixState | undefined = initialState,
  action: MatrixAction,
): MatrixState => {
  return {
    topics: topicsReducer(state.topics, action),
    tasks: tasksReducer(state.tasks, action),
    taskHistory: taskHistoryReducer(state.taskHistory, action),
    requestStatus: requestStatusReducer(state.requestStatus, action),
  };
};

const topicsReducer = (
  topics: MatrixState['topics'],
  action: MatrixAction,
): MatrixState['topics'] => {
  switch (action.type) {
    case GET_MATRIX_DATA_SUCCESS:
      return action.data.topics;
    case ADD_TOPIC_SUCCESS:
      return [...topics, action.topic];
    case UPDATE_TOPIC_SUCCESS:
      const topicIndex = findIndexInArray(
        topics.map((t) => t.id),
        action.topic.id,
      );
      const newTopics = [...topics];
      if (topicIndex > -1) {
        newTopics[topicIndex] = action.topic;
      }
      return newTopics;
    case TOGGLE_TOPIC_VISIBLITY:
      const topicIdx = findIndexInArray(
        topics.map((t) => t.id),
        action.topicId,
      );
      const toggleTopics = [...topics];
      if (topicIdx > -1) {
        toggleTopics[topicIdx].visible = !toggleTopics[topicIdx].visible;
      }
      return toggleTopics;
    default:
      return topics;
  }
};

const tasksReducer = (
  tasks: MatrixState['tasks'],
  action: MatrixAction,
): MatrixState['tasks'] => {
  switch (action.type) {
    case GET_MATRIX_DATA_SUCCESS:
      return action.data.tasks;
    case UPDATE_TASK_SUCCESS:
    case DELETE_TASK_SUCCESS:
      console.log(action.task.name);
      const taskIndex = findIndexInArray(
        tasks.map((t) => t.id),
        action.task.id,
      );
      console.log(taskIndex);
      const newTasks = [...tasks];
      if (taskIndex > -1) {
        newTasks[taskIndex] = action.task;
      }
      console.log(newTasks);
      return newTasks;
    case TOGGLE_TASK_DONE:
      const taskIdx = findIndexInArray(
        tasks.map((t) => t.id),
        action.taskId,
      );
      const toggleTasks = [...tasks];
      if (taskIdx > -1) {
        toggleTasks[taskIdx].done = !toggleTasks[taskIdx].done;
      }
      return toggleTasks;
    default:
      return tasks;
  }
};

const taskHistoryReducer = (
  taskHistory: MatrixState['taskHistory'],
  action: MatrixAction,
): MatrixState['taskHistory'] => {
  switch (action.type) {
    case DELETE_TASK_SUCCESS:
      return findAndRemoveIndexInArray([...taskHistory], action.task.id);
    case SELECT_TASK:
      const newHistory = findAndRemoveIndexInArray(
        [...taskHistory],
        action.currentTaskId,
      );
      newHistory.unshift(action.currentTaskId);
      if (newHistory.length > 6) {
        newHistory.pop();
      }
      return newHistory;
    default:
      return [...taskHistory];
  }
};

const requestStatusReducer = (
  requestStatus: MatrixState['requestStatus'],
  action: MatrixAction,
): MatrixState['requestStatus'] => {
  switch (action.type) {
    // === loading cases ===
    case GET_MATRIX_DATA:
    case UPDATE_TASK:
    case DELETE_TASK:
    case TOGGLE_TASK_DONE:
    case UPDATE_TOPIC:
    case ADD_TOPIC:
      return {
        isLoading: true,
        errorMessage: undefined,
      };
    // === failed cases ===
    case GET_MATRIX_DATA_FAILED:
    case UPDATE_TASK_FAILED:
    case DELETE_TASK_FAILED:
    case TOGGLE_TASK_DONE_FAILED:
    case UPDATE_TOPIC_FAILED:
    case ADD_TOPIC_FAILED:
      return {
        isLoading: false,
        errorMessage: action.message,
      };
    // === success cases ===
    case GET_MATRIX_DATA_SUCCESS:
    case UPDATE_TASK_SUCCESS:
    case DELETE_TASK_SUCCESS:
    case TOGGLE_TASK_DONE_SUCCESS:
    case ADD_TOPIC_SUCCESS:
    case UPDATE_TOPIC_SUCCESS:
      return {
        isLoading: false,
        errorMessage: undefined,
      };
    default:
      return requestStatus;
  }
};

function findIndexInArray(array: number[], id: number): number {
  return array.findIndex((t) => t === id);
}

function findAndRemoveIndexInArray(array: number[], id: number): number[] {
  const index = findIndexInArray(array, id);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}
