import {createSlice} from "@reduxjs/toolkit";
import {SettingTypes} from "constants/constants";

const initialState = {
    country: {},
    setting: {},
    workspaces: [
        {
            "id": "8236b5c1-e990-49b5-ba62-2059eab8b96b",
            "name": "Storyrow",
            "code": "storyrow",
            "endpoint": "storyrow",
            "size": "2-20"
        },
        {
            "id": "8236b5c1-e990-49b5-ba62-2059eab8b44v",
            "name": "Open Source",
            "code": "opensource",
            "endpoint": "opensource",
            "size": "2-20"
        }
    ],
    workspace: {
        // "id": "8236b5c1-e990-49b5-ba62-2059eab8b96b",
        // "name": "Storyrow",
        // "code": "storyrow",
        // "endpoint": "storyrow",
        // "size": "2-20"
    },
    projects: [],
    project: {}
};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setSetting: (state, action) => {
            const settings = action.payload;
            settings?.forEach(item => {
                if (item.isDefault) {
                    switch (item.type) {
                        case SettingTypes.general:
                            state.setting.general = item;
                            break;
                        case SettingTypes.storage:
                            state.setting.storage = item;
                            break;
                        case SettingTypes.payment:
                            state.setting.payment = item;
                            break;
                        default:
                            break;
                    }
                }
            });
        },
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload;
        },
        setWorkspace: (state, action) => {
            state.workspace = action.payload;
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setProject: (state, action) => {
            state.project = action.payload;
        },
        reset: () => initialState
    }
});

export const AppActions = AppSlice.actions;
export default AppSlice;
