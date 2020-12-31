import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "user", // Sliceの名称
    initialState: {
        name: 'aoao',
        cursorIndex: 1,
    },
    reducers: {
        setName: (state, action) => {
            return Object.assign({}, state, { name: action.payload })
        },
        clearName: state => {
            return Object.assign({}, state, { name: "" })
        },
    },
});

export default slice.reducer;

// reducers のKey名のActionが自動生成される
export const { setName, clearName } = slice.actions;