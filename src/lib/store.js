//A simple redux store/actions/reducer implementation
//A true app would be more complex and separated into different files

import {configureStore, createSlice} from '@reduxjs/toolkit';

// Our new error field is configured here
const AppStateSlice = createSlice({
  name: "appState",
  initialState: "",
  reducers: {
    updateAppState: (state, action) => {
        return {
            ...state,
            isError: action.payload,
            };
        },
    },
});

//The initial state of our store when the app loads
//Usually fetched from a server

const defaultTasks = [
    { id: '1', title: 'Something', state: 'TASK_INBOX' },
    { id: '2', title: 'Something more', state: 'TASK_INBOX' },
    { id: '3', title: 'Something else', state: 'TASK_INBOX' },
    { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

//The store is created here.
//Docs https://redux-toolkit.js.org/api/createSlice

const TasksSlice = createSlice({
    name: 'tasks',
    initialState: defaultTasks,
    reducers: {
        updateTaskState: (state,action) => {
            const { id, newTaskState} = action.payload
            const task = state.findIndex(task => task.id === id);
            if(task >= 0) {
                state[task].state = newTaskState;
            }
        },
    },
});

//The actions contained in this slice are exported for usage in our components
export const {updateTaskState} = TasksSlice.actions;
//The actions contained in the new slice are exported to be used in our components
export const {updateAppState} = AppStateSlice.actions;

//Our apps configuration goes here.
//Docs https://redux-toolkit.js.org/api/configureStore

const store = configureStore({
    reducer: {
        tasks: TasksSlice.reducer,
        isError: AppStateSlice.reducer,
    },
});

export default store;