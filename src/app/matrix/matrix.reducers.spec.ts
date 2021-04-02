import { TestBed, waitForAsync } from '@angular/core/testing';
import { Color } from '../shared/color.interfaces';
import {
  AddTopic,
  AddTopicFailed,
  AddTopicSuccess,
  DeleteTaskSuccess,
  GetMatrixData,
  GetMatrixDataFailed,
  GetMatrixDataSuccess,
  MatrixAction,
  SelectTask,
  ToggleTopicVisibility,
  UpdateTask,
  UpdateTaskFailed,
  UpdateTaskSuccess,
  UpdateTopic,
  UpdateTopicFailed,
  UpdateTopicSuccess,
} from './matrix.actions';
import { Task, Topic } from './matrix.interfaces';
import { matrixReducer, MatrixState } from './matrix.reducers';

describe('MatrixReducers', () => {
  let dummyTask: Task;
  let dummyTopic: Topic;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({});
    }),
  );

  beforeEach(() => {
    dummyTask = {
      id: 1,
      name: 'test',
      topic: 1,
      importance: 1,
      dueDay: 1,
      dueMonth: 1,
      dueYear: 21,
      done: false,
      deleted: false,
      createdAt: new Date(),
    };

    dummyTopic = {
      id: 1,
      name: 'test',
      color: Color.blue,
      visible: true,
      deleted: false,
    };
  });

  describe('loading cases', () => {
    let defaultState: MatrixState;
    let loadingState: MatrixState;

    beforeEach(() => {
      defaultState = {
        topics: [],
        tasks: [],
        taskHistory: [],
        requestStatus: {
          isLoading: false,
          errorMessage: undefined,
        },
      };

      loadingState = {
        ...defaultState,
        requestStatus: {
          isLoading: true,
          errorMessage: undefined,
        },
      };
    });

    it('should set loading on GET_MATRIX_DATA', () => {
      const action: MatrixAction = new GetMatrixData();
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(loadingState);
    });

    it('should set loading on UPDATE_TASK', () => {
      const action: MatrixAction = new UpdateTask({ ...dummyTask });
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(loadingState);
    });

    it('should set loading on UPDATE_TOPIC', () => {
      const action: MatrixAction = new UpdateTopic({ ...dummyTopic });
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(loadingState);
    });

    it('should set loading on ADD_TOPIC', () => {
      const action: MatrixAction = new AddTopic();
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(loadingState);
    });
  });

  describe('failed cases', () => {
    let defaultState: MatrixState;
    let failedState: MatrixState;
    let errorMessage: string;

    beforeEach(() => {
      defaultState = {
        topics: [],
        tasks: [],
        taskHistory: [],
        requestStatus: {
          isLoading: true,
          errorMessage: undefined,
        },
      };

      errorMessage = 'test error message';

      failedState = {
        ...defaultState,
        requestStatus: {
          isLoading: false,
          errorMessage,
        },
      };
    });

    it('should set error message on GET_MATRIX_DATA_FAILED', () => {
      const action: MatrixAction = new GetMatrixDataFailed(errorMessage);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(failedState);
    });

    it('should set error message on UPDATE_TASK_FAILED', () => {
      const action: MatrixAction = new UpdateTaskFailed(errorMessage);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(failedState);
    });

    it('should set error message on UPDATE_TOPIC_FAILED', () => {
      const action: MatrixAction = new UpdateTopicFailed(errorMessage);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(failedState);
    });

    it('should set error mesage on ADD_TOPIC_FAILED', () => {
      const action: MatrixAction = new AddTopicFailed(errorMessage);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(failedState);
    });
  });

  describe('unloading cases', () => {
    let defaultState: MatrixState;

    beforeEach(() => {
      defaultState = {
        topics: [{ ...dummyTopic }],
        tasks: [{ ...dummyTask }],
        taskHistory: [],
        requestStatus: {
          isLoading: true,
          errorMessage: 'test message',
        },
      };
    });

    it('should set unloading on GET_MATRIX_DATA_SUCCESS', () => {
      const action: MatrixAction = new GetMatrixDataSuccess({
        topics: [],
        tasks: [],
      });
      const newState = matrixReducer(defaultState, action);
      expect(newState.requestStatus.isLoading).toEqual(false);
      expect(newState.requestStatus.errorMessage).toBeUndefined();
    });

    it('should set unloading on UPDATE_TASK_SUCCESS', () => {
      const action: MatrixAction = new UpdateTaskSuccess({ ...dummyTask });
      const newState = matrixReducer(defaultState, action);
      expect(newState.requestStatus.isLoading).toEqual(false);
      expect(newState.requestStatus.errorMessage).toBeUndefined();
    });

    it('should set unloading on ADD_TOPIC_SUCCESS', () => {
      const action: MatrixAction = new AddTopicSuccess({ ...dummyTopic });
      const newState = matrixReducer(defaultState, action);
      expect(newState.requestStatus.isLoading).toEqual(false);
      expect(newState.requestStatus.errorMessage).toBeUndefined();
    });

    it('should set unloading on UPDATE_TOPIC_SUCCESS', () => {
      const action: MatrixAction = new UpdateTopicSuccess({ ...dummyTopic });
      const newState = matrixReducer(defaultState, action);
      expect(newState.requestStatus.isLoading).toEqual(false);
      expect(newState.requestStatus.errorMessage).toBeUndefined();
    });

    it('should set unloading on DELETE_TASK_SUCCESS', () => {
      const action: MatrixAction = new DeleteTaskSuccess({
        ...dummyTask,
        deleted: true,
        updatedAt: new Date(),
        deletedAt: new Date(),
      });
      const newState = matrixReducer(defaultState, action);
      expect(newState.requestStatus.isLoading).toEqual(false);
      expect(newState.requestStatus.errorMessage).toBeUndefined();
    });
  });

  describe('success states', () => {
    let defaultState: MatrixState;
    let emptyState: MatrixState;

    beforeEach(() => {
      emptyState = {
        topics: [],
        tasks: [],
        taskHistory: [],
        requestStatus: {
          isLoading: true,
          errorMessage: undefined,
        },
      };

      defaultState = {
        ...emptyState,
        topics: [{ ...dummyTopic }],
        tasks: [],
      };
    });

    it('should set new data on GET_MATRIX_DATA_SUCCESS', () => {
      const action: MatrixAction = new GetMatrixDataSuccess({
        topics: [{ ...dummyTopic }],
        tasks: [],
      });
      const newState = matrixReducer(emptyState, action);
      expect(newState).toEqual({
        ...defaultState,
        requestStatus: { isLoading: false, errorMessage: undefined },
      });
    });

    it('should update task on UPDATE_TASK_SUCCESS', () => {
      defaultState = {
        ...defaultState,
        tasks: [{ ...dummyTask }],
      };
      const updatedTask = { ...dummyTask, importance: 7 };
      const action: MatrixAction = new UpdateTaskSuccess(updatedTask);
      const newState = matrixReducer(defaultState, action);
      expect(newState.tasks).toContain(updatedTask);
    });

    it('should delete task on DELETE_TASK_SUCCESS', () => {
      defaultState = {
        ...defaultState,
        tasks: [{ ...dummyTask }],
      };
      const updatedTask = {
        ...dummyTask,
        deleted: true,
        deletedAt: new Date(),
      };
      const action: MatrixAction = new DeleteTaskSuccess(updatedTask);
      const newState = matrixReducer(defaultState, action);
      expect(newState.tasks[0]).toEqual(updatedTask);
    });

    it('should add topic on ADD_TOPIC_SUCCESS', () => {
      const newTopic = { ...dummyTopic, id: 2, color: Color.green };
      const action: MatrixAction = new AddTopicSuccess(newTopic);
      const newState = matrixReducer(defaultState, action);
      expect(newState.topics).toContain(newTopic);
    });

    it('should update topic on UPDATE_TOPIC_SUCCESS', () => {
      const updatedTopic = { ...dummyTopic, color: Color.green };
      const action: MatrixAction = new UpdateTopicSuccess(updatedTopic);
      const newState = matrixReducer(defaultState, action);
      expect(newState.topics).toContain(updatedTopic);
    });
  });

  describe('toggle visibility', () => {
    let defaultState: MatrixState;

    beforeEach(() => {
      defaultState = {
        topics: [
          { ...dummyTopic },
          { ...dummyTopic, id: 2, color: Color.green, visible: false },
        ],
        tasks: [],
        taskHistory: [],
        requestStatus: {
          isLoading: false,
          errorMessage: undefined,
        },
      };
    });

    it('should toggle visibility on TOGGLE_TOPIC_VISIBILITY', () => {
      const action1: MatrixAction = new ToggleTopicVisibility(1);
      const action2: MatrixAction = new ToggleTopicVisibility(2);
      const newState1 = matrixReducer(defaultState, action1);
      expect(newState1.topics[0].visible).toEqual(false);
      expect(newState1.topics[1].visible).toEqual(false);
      const newState2 = matrixReducer(newState1, action2);
      expect(newState2.topics[0].visible).toEqual(false);
      expect(newState2.topics[1].visible).toEqual(true);
    });

    it('should not change if topic not found on TOGGLE_TOPIC_VISIBILITY', () => {
      const action: MatrixAction = new ToggleTopicVisibility(3);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual(defaultState);
    });
  });

  describe('select task', () => {
    let defaultState: MatrixState;

    beforeEach(() => {
      defaultState = {
        topics: [],
        tasks: [
          { ...dummyTask },
          { ...dummyTask, id: 2 },
          { ...dummyTask, id: 3 },
          { ...dummyTask, id: 4 },
          { ...dummyTask, id: 5 },
          { ...dummyTask, id: 6 },
          { ...dummyTask, id: 7 },
        ],
        taskHistory: [],
        requestStatus: {
          isLoading: false,
          errorMessage: undefined,
        },
      };
    });

    it('should select tasks in correct order on SELECT_TASK', () => {
      const action1: MatrixAction = new SelectTask(1);
      const action2: MatrixAction = new SelectTask(2);
      const action3: MatrixAction = new SelectTask(3);
      const action4: MatrixAction = new SelectTask(4);
      let newState = matrixReducer(defaultState, action1);
      newState = matrixReducer(newState, action2);
      newState = matrixReducer(newState, action3);
      newState = matrixReducer(newState, action4);
      newState = matrixReducer(newState, action4);
      expect(newState.taskHistory).toEqual([4, 3, 2, 1]);
    });

    it('should only select task once on SELECT_TASK', () => {
      const action: MatrixAction = new SelectTask(1);
      let newState = matrixReducer(defaultState, action);
      newState = matrixReducer(newState, action);
      expect(newState.taskHistory).toEqual([1]);
    });

    it('should only change taskHistory on SELECT_TASK', () => {
      const action: MatrixAction = new SelectTask(1);
      const newState = matrixReducer(defaultState, action);
      expect(newState).toEqual({ ...defaultState, taskHistory: [1] });
    });

    it('should correctly order tasks in history on SELECT_TASK', () => {
      const action1: MatrixAction = new SelectTask(1);
      const action7: MatrixAction = new SelectTask(7);
      const action5: MatrixAction = new SelectTask(5);
      const action3: MatrixAction = new SelectTask(3);
      let newState = matrixReducer(defaultState, action1);
      newState = matrixReducer(newState, action7);
      newState = matrixReducer(newState, action5);
      newState = matrixReducer(newState, action3);
      newState = matrixReducer(newState, action3);
      newState = matrixReducer(newState, action1);
      expect(newState.taskHistory).toEqual([1, 3, 5, 7]);
    });

    it('should only take 6 elements in history on SELECT_TASK', () => {
      let newState = matrixReducer(defaultState, new SelectTask(1));
      for (let i = 2; i < 8; i++) {
        newState = matrixReducer(newState, new SelectTask(i));
      }
      expect(newState.taskHistory.length).toEqual(6);
    });
  });
});
