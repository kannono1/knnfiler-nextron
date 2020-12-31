import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "todos", // Sliceの名称
    initialState: {
        items: ['bbb']
    },
    reducers: {
        addTodo: (state, action) => {
            return Object.assign({}, state, { name: action.payload })
        },
        clearTodo: state => {
            return Object.assign({}, state, { name: "" })
        },
    },
});

export default slice.reducer;

// reducers のKey名のActionが自動生成される
export const { addTodo, clearTodo } = slice.actions;
