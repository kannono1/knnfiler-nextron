import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    cursorIndex: number,
    wid: number,
}

const initialState = {
    cursorIndex: 0,
    wid: 0,
} as CounterState

const slice = createSlice({
    name: "files", // Sliceの名称
    initialState: initialState,
    reducers: {
        downCursor(state, action: PayloadAction<number>) {
            state.cursorIndex += action.payload;
        },
        switchWindow (state) {
            state.wid ^= 1;
        },
        upCursor(state, action: PayloadAction<number>) {
            state.cursorIndex -= action.payload;
            if (state.cursorIndex < 0) {
                state.cursorIndex = 0;
            }
        },
    },
});

export default slice.reducer;

// reducers のKey名のActionが自動生成される
export const { downCursor, switchWindow, upCursor } = slice.actions;