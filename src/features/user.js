import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        photo: null,
        idPhotoUser: null
    },
    reducers: {
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
        updatePhoto: (state, action) => {
            state.photo = action.payload;
        },
        updateIdPhotoUser: (state, action) => {
            state.idPhotoUser = action.payload
        }
    }
})
export const {updateUsername, updatePhoto,updateIdPhotoUser} = userSlice.actions;
export default userSlice.reducer;