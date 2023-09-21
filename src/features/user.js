import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        photo: null
    },
    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
        updatePhoto: (state, action) => {
            state.photo = action.payload;
        }
    }
})
export const {updateUsername, updatePhoto} = userSlice.actions;
export default userSlice.reducer;