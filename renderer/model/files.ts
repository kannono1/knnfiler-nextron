import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {FileInfo} from '../data/FileInfo';
const fs = require('fs');
const path = require('path');

interface CounterState {
    currentDirectory: Array<string>,
    cursorIndex: number,
    fileList: Array<Array<FileInfo>>,
    wid: number,
}

const initialState = {
    currentDirectory: [process.env.PWD, process.env.PWD],
    fileList: [[], []],
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
        readCurrentDir(state, action: PayloadAction<number>) {
            var files = fs.readdirSync(state.currentDirectory[action.payload]);
            var arr = files.map((fn)=>{
                const p = path.join(state.currentDirectory[action.payload], fn);
                const stat = fs.statSync(p);
                const fileInfo:FileInfo = {
                    fileName:fn,
                    fileSize:stat.size,
                    updated: stat.mtime.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                    isDir: stat.isDirectory(),
                };
                return fileInfo;
            });
            state.fileList[action.payload] = arr;
        },
        switchWindow(state) {
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
export const { downCursor, switchWindow, readCurrentDir, upCursor } = slice.actions;