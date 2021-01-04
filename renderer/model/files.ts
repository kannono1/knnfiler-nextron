import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileInfo } from '../data/FileInfo';
const fs = require('fs');
const path = require('path');

interface CounterState {
    currentDirectory: Array<string>,
    cursorIndex: Array<number>,
    fileList: Array<Array<FileInfo>>,
    wid: number,
}

const initialState = {
    currentDirectory: [process.env.PWD, process.env.PWD],
    fileList: [[], []],
    cursorIndex: [0, 0],
    wid: 0,
} as CounterState

const readDir = (dir) => {
    const files = fs.readdirSync(dir);
    return files.map((fn) => {
        return getFileInfo(path.join(dir, fn));
    });
};

const getFileInfo = (p) => {
    try {
        const stat = fs.statSync(p);
        return {
            fileName: path.basename(p),
            fileSize: stat.size,
            updated: stat.mtime.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            isDir: stat.isDirectory(),
        };
    } catch (e) {
        return {
            fileName: path.basename(p),
            fileSize: -1,
            updated: '-',
            isDir: false,
        }
    }
};

const slice = createSlice({
    name: "files", // Sliceの名称
    initialState: initialState,
    reducers: {
        downCursor(state, action: PayloadAction<number>) {
            state.cursorIndex[state.wid] += action.payload;
        },
        enter(state) {
            const fileInfo = state.fileList[state.wid][state.cursorIndex[state.wid]];
            if (fileInfo.isDir) {
                const p = path.join(state.currentDirectory[state.wid], fileInfo.fileName);
                state.cursorIndex[state.wid] = 0;
                state.currentDirectory[state.wid] = p;
                state.fileList[state.wid] = readDir(p);
            }
        },
        gotoParentDir(state) {
            const p = path.dirname(state.currentDirectory[state.wid]);
            state.cursorIndex[state.wid] = 0;
            state.currentDirectory[state.wid] = p;
            state.fileList[state.wid] = readDir(p);
        },
        readCurrentDir(state, action: PayloadAction<number>) {
            state.fileList[action.payload] = readDir(state.currentDirectory[action.payload]);
        },
        switchWindow(state) {
            state.wid ^= 1;
        },
        upCursor(state, action: PayloadAction<number>) {
            state.cursorIndex[state.wid] -= action.payload;
            if (state.cursorIndex[state.wid] < 0) {
                state.cursorIndex[state.wid] = 0;
            }
        },
    },
});

export default slice.reducer;

// reducers のKey名のActionが自動生成される
export const { downCursor, enter, gotoParentDir, switchWindow, readCurrentDir, upCursor } = slice.actions;