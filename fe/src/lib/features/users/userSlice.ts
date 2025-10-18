import { createSlice } from '@reduxjs/toolkit'

let userJson = null
if (typeof window !== "undefined") {
    userJson = localStorage.getItem("user");
}
const initialState = {
    user: userJson ? JSON.parse(userJson) : null
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        loginSuccess: (state, { payload }) => {
            state.user = payload;
        },
        removeUser: (state) => {
            localStorage.removeItem("user");
            state.user = null;
        }
    }
});

export const { loginSuccess, removeUser } = userSlice.actions

export default userSlice.reducer