import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isLoggedIn: false,
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
            const date = new Date();
            const expiry = date.getTime() + (1000 * 60 * 60 * 24 * 30)
            window.localStorage.setItem('expiry', expiry)
            window.localStorage.setItem('user', JSON.stringify(action.payload));
            window.localStorage.setItem('isLoggedIn', true);
        },
        logout(state) {
            state.user = {};
            state.isLoggedIn = false;
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('isLoggedIn');
            window.localStorage.removeItem('expiry');
        },
        setUser(state, action) {
            state.user = action.payload;
            window.localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setUserFavorites(state, action) {
            const user = state.user;
            user.favorites = action.payload;
            window.localStorage.setItem('user', JSON.stringify(user));
        }
    }
})


export const userActions = userSlice.actions;

export default userSlice;