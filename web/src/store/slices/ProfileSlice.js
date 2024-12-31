import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: '',
    email: '',
    phone: '',
    role: {
        code: 'admin'
    },
    info: {},
    permissions: [
        'all',
        'user:read',
        'project:read'
    ]
};

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.image = action.payload.image;
            state.phone = action.payload?.phone ?? '';
            state.info = action.payload?.info ?? {};
        },
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
        reset: () => initialState
    }
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;
