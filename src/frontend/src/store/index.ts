import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meetingsReducer from "./slice/meetings.slice";

const rootReducer = combineReducers({
    meetingsReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type Store = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Store["dispatch"];
