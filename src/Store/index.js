import { createSlice, configureStore } from "@reduxjs/toolkit";

const isAuthSlice = createSlice({
    name: "isAuth",
    initialState: { isAuth: false },
    reducers: {
        login(state) {
            state.isAuth = true;
        },
        logout(state) {
            state.isAuth = false;
        }
    }
});

export const { login, logout } = isAuthSlice.actions;

const store = configureStore({
    reducer: {
        isAuth: isAuthSlice.reducer,
    }
});

export default store 
