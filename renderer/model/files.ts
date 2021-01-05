import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileInfo } from '../data/FileInfo';
import WindowMode from "../data/WindowMode";
const fs = require('fs');
const path = require('path');

interface CounterState {
    currentDirectory: Array<string>,
    cursorIndex: Array<number>,
    fileList: Array<Array<FileInfo>>,
    imageContent: string,
    textContent: string,
    wid: number,
    windowMode: WindowMode,
}

const initialState = {
    currentDirectory: [process.env.PWD, process.env.PWD],
    fileList: [[], []],
    cursorIndex: [0, 0],
    imageContent: '',
    textContent: '',
    wid: 0,
    windowMode: WindowMode.Files,
} as CounterState

const readImageBase64 = (p) => {
    const b = fs.readFileSync(p);
    return b.toString('base64')
};

const readText = (p) => {
    const t = fs.readFileSync(p);
    return t.toString();
};

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
            const p = path.join(state.currentDirectory[state.wid], fileInfo.fileName);
            if (fileInfo.isDir) {
                state.cursorIndex[state.wid] = 0;
                state.currentDirectory[state.wid] = p;
                state.fileList[state.wid] = readDir(p);
            }
            else {
                if (path.extname(p) == '.png') {
                    state.windowMode = WindowMode.ImageView;
                    state.imageContent = readImageBase64(p);
                }
                else {
                    state.windowMode = WindowMode.TextView;
                    state.textContent = readText(p);
                }
            }
        },
        escape(state) {
            state.windowMode = WindowMode.Files;
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
export const { downCursor, enter, escape, gotoParentDir, switchWindow, readCurrentDir, upCursor } = slice.actions;