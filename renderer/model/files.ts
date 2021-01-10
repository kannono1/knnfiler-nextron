import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import path from 'path';
import { CursorInfo, CursorInfoDictionary } from "../data/CursorInfo";
import { FileInfo } from '../data/FileInfo';
import WindowMode from "../data/WindowMode";
import { copyToClipboard, readImageBase64, readText, readDir } from "../util/FileUtil";

interface CounterState {
    currentDirectory: Array<string>,// [wid]
    cursorIndex: Array<number>,// [wid]
    cursorInfoDictionary: Array<CursorInfoDictionary>,// [wid]
    fileList: Array<Array<FileInfo>>,// [wid][fileListRowNB]
    fileListRowNB: number,
    imageContent: string, // Base64
    screenCursorOffset: Array<number>,// [wid]
    textContent: string,
    wid: number,
    windowMode: WindowMode,
}

const initialState = {
    currentDirectory: [process.env.PWD, process.env.PWD],
    cursorIndex: [0, 0],
    cursorInfoDictionary: [{}, {}],
    fileList: [[], []],
    fileListRowNB: 30,
    screenCursorOffset: [0, 0],
    imageContent: '',
    textContent: '',
    wid: 0,
    windowMode: WindowMode.Files,
} as CounterState

const saveCursor = (state) => {
    state.cursorInfoDictionary[state.wid][state.currentDirectory[state.wid]] = {
        index: state.cursorIndex[state.wid],
        offset: state.screenCursorOffset[state.wid],
    };
};

const loadCursor = (state) => {
    if (state.currentDirectory[state.wid] in state.cursorInfoDictionary[state.wid]) {
        state.cursorIndex[state.wid] = state.cursorInfoDictionary[state.wid][state.currentDirectory[state.wid]].index;
        state.screenCursorOffset[state.wid] = state.cursorInfoDictionary[state.wid][state.currentDirectory[state.wid]].offset;
    }
    else {
        state.cursorIndex[state.wid] = 0;
        state.screenCursorOffset[state.wid] = 0;
    }

};

const updateScreenCursorOffset = (state, v = 0) => {
    if (v >= 0) { // 下方向
        if (state.cursorIndex[state.wid] >= state.screenCursorOffset[state.wid] + state.fileListRowNB) { // Indexがオフセット＋画面の行数を超えているとき
            state.screenCursorOffset[state.wid] = state.cursorIndex[state.wid] - state.fileListRowNB + 1; // Indexが超えた分オフセットする
        }
    } else { // 上方向
        if (state.screenCursorOffset[state.wid] > state.cursorIndex[state.wid]) {// Indexがオフセットより小さいとき
            state.screenCursorOffset[state.wid] = state.cursorIndex[state.wid];// オフセット＝Index
        }
    }
};

const moveCursor = (state, v) => {
    state.cursorIndex[state.wid] += v;
    if (state.cursorIndex[state.wid] < 0) {
        state.cursorIndex[state.wid] = 0;
    }
    if (state.cursorIndex[state.wid] >= state.fileList[state.wid].length - 1) {
        state.cursorIndex[state.wid] = state.fileList[state.wid].length - 1;
    }
    updateScreenCursorOffset(state, v);
};

const slice = createSlice({
    name: "files", // Sliceの名称
    initialState: initialState,
    reducers: {
        copyFilePath(state) {
            const fileInfo = state.fileList[state.wid][state.cursorIndex[state.wid]];
            const p = path.join(state.currentDirectory[state.wid], fileInfo.fileName);
            console.log('copyFilePath', p);
            copyToClipboard(p);
        },
        downCursor(state, action: PayloadAction<number>) {
            moveCursor(state, action.payload);
            saveCursor(state);
        },
        enter(state) {
            const fileInfo = state.fileList[state.wid][state.cursorIndex[state.wid]];
            const p = path.join(state.currentDirectory[state.wid], fileInfo.fileName);
            if (fileInfo.isDir) {
                state.currentDirectory[state.wid] = p;
                loadCursor(state);
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
            state.imageContent = '';
            state.textContent = '';
        },
        gotoFirstLine(state) {
            state.cursorIndex[state.wid] = 0;
            updateScreenCursorOffset(state, -1);// 上方向として扱う
            saveCursor(state);
        },
        gotoLastLine(state) {
            state.cursorIndex[state.wid] = state.fileList[state.wid].length - 1;
            updateScreenCursorOffset(state);
            saveCursor(state);
        },
        gotoParentDir(state) {
            const p = path.dirname(state.currentDirectory[state.wid]);
            state.currentDirectory[state.wid] = p;
            loadCursor(state);
            state.fileList[state.wid] = readDir(p);
        },
        readCurrentDir(state, action: PayloadAction<number>) {
            state.fileList[action.payload] = readDir(state.currentDirectory[action.payload]);
        },
        switchWindow(state) {
            state.wid ^= 1;
        },
        upCursor(state, action: PayloadAction<number>) {
            moveCursor(state, -action.payload);
            saveCursor(state);
        },
    },
});

export default slice.reducer;

// reducers のKey名のActionが自動生成される
export const { copyFilePath, downCursor, enter, escape, gotoFirstLine, gotoLastLine, gotoParentDir, switchWindow, readCurrentDir, upCursor } = slice.actions;