import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    breakpoints: 'lg',
    isSidebarCollapsed: false,
    sidebarWidth: 240,
    sidebarIconWidth: 35,
    sidebarIconSize: '1rem',
    sidebarCircleIconSize: '0.35rem',
    groupActive: [],
    rightSideBarOpen: false,
    rightSideBarContent: null
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setSidebarCollapse: (state, action) => {
            state.isSidebarCollapsed = action.payload;
        },
        addGroupActive: (state, action) => {
            state.groupActive = [...state.groupActive, action.payload];
        },
        removeGroupActive: (state, action) => {
            state.groupActive = state.groupActive.filter(e => e !== action.payload);
        },
        setRightSidebarOpen: (state, action) => {
            state.rightSideBarOpen = action.payload;
        },
        setRightSidebarContent: (state, action) => {
            state.rightSideBarContent = action.payload;
        }
    }
});

export const ThemeActions = ThemeSlice.actions;
export default ThemeSlice;
