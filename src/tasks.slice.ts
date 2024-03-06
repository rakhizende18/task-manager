import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TaskItemType } from "./mocks";
import { RootState } from "./store";

const tasksSlice = createSlice({
  name: "taskManager",
  initialState: [] as TaskItemType[],
  reducers: {
    setTask: (state, action: PayloadAction<TaskItemType[]>) => {
      return [...action.payload];
    },
    addTask: (state, action: PayloadAction<TaskItemType>) => {
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    },
    editTask: (state, action: PayloadAction<TaskItemType>) => {
      let newState = [...state];
      var foundIndex = newState.findIndex((el) => el.id === action.payload.id);
      newState[foundIndex] = action.payload;
      return [...newState];
    },
    removeTask: (state, action: PayloadAction<number>) => {
      return [...state.filter((el) => el.id !== action.payload)];
    },
  },
});

export const { setTask, addTask, editTask, removeTask } = tasksSlice.actions;

export const getTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
