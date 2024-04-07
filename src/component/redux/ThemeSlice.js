import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
}

const themeSlice = createSlice({

    name: "theme",
    initialState,
    reducers: {
        changeTheme: (action,state) => {
            state = { ...state, theme: action.theme === "light" ? "dark" : "light" };
            return state;
        }
    }

})
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;