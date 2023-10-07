import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: undefined,
    email: undefined,
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.username = initialState.username;
            state.email = initialState.email;
        },
    },
});

export const selectUser = (state) => state.user;

export const { setUser, logout } = user.actions;

export default user.reducer;
