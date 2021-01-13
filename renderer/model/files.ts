import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import path from 'path';
import CommandMode from "../data/CommandMode";
import { CursorInfoDictionary } from "../data/CursorInfo";
import { FileInfo } from '../data/FileInfo';
import WindowMode from "../data/WindowMode";
import * as FileUtil from "../util/FileUtil";

interface CounterState {
    commandMode: CommandMode,
    currentDirectory: Array<string>,// [wid]
    cursorIndex: Array<number>,// [wid]
    cursorInfoDictionary: Array<CursorInfoDictionary>,// [wid]
    fileList: Array<Array<FileInfo>>,// [wid][fileListRowNB]
    fileListRowNB: number,
    imageContent: string, // Base64
    screenCursorOffset: Array<number>,// [wid]
    targetPath: string,// cursorのFilePath
    textContent: string,
    wid: number,
    windowMode: WindowMode,
}

const initialState = {
    commandMode: CommandMode.None,
    currentDirectory: [process.env.PWD, process.env.PWD],
    cursorIndex: [0, 0],
    cursorInfoDictionary: [{}, {}],
    fileList: [[], []],
    fileListRowNB: 30,
    screenCursorOffset: [0, 0],
    imageContent: '',
    targetPath: '',
    textContent: '',
    wid: 0,
    windowMode: WindowMode.Files,
} as CounterState

const getCurrentPath = (state, wid: number) => {
    const fileInfo = state.fileList[wid][state.cursorIndex[wid]];
    return path.join(state.currentDirectory[wid], fileInfo.fileName);
};

const saveCursorPosition = (state) => {
    state.cursorInfoDictionary[state.wid][state.currentDirectory[state.wid]] = {
        index: state.cursorIndex[state.wid],
        offset: state.screenCursorOffset[state.wid],
    };
};

const loadCursorPosition = (state) => {
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

const updateFileList = (state, wid: number = 2) => {
    switch (wid) {
        case 0:
        case 1:
            state.fileList[wid] = FileUtil.readDir(state.currentDirectory[wid]);
            break;
        default:
            state.fileList[0] = FileUtil.readDir(state.currentDirectory[0]);
            state.fileList[1] = FileUtil.readDir(state.currentDirectory[1]);
            break;
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
        confirmed(state) {
            switch (state.commandMode) {
                case CommandMode.Delete:
                    FileUtil.remove(getCurrentPath(state, state.wid));
                    break;
                default:
                    break;
            }
            state.targetPath = '';
            state.commandMode = CommandMode.None;
            state.windowMode = WindowMode.Files;
            updateFileList(state);
        },
        confirmToDelete(state) {
            state.targetPath = getCurrentPath(state, state.wid);
            state.commandMode = CommandMode.Delete;
            state.windowMode = WindowMode.ConfirmView;
        },
        copy(state) {
            const other = state.wid ^ 1;
            const fileInfo = state.fileList[state.wid][state.cursorIndex[state.wid]];
            const a = path.join(state.currentDirectory[state.wid], fileInfo.fileName);
            const b = path.join(state.currentDirectory[other], fileInfo.fileName);
            FileUtil.copy(a, b);
            updateFileList(state, other);
        },
        downCursor(state, action: PayloadAction<number>) {
            moveCursor(state, action.payload);
            saveCursorPosition(state);
        },
        enter(state) {
            const fileInfo = state.fileList[state.wid][state.cursorIndex[state.wid]];
            const p = path.join(state.currentDirectory[state.wid], fileInfo.fileName);
            if (fileInfo.isDir) {
                state.currentDirectory[state.wid] = p;
                loadCursorPosition(state);
                updateFileList(state, state.wid);
            }
            else {
                if (path.extname(p) == '.png') {
                    state.windowMode = WindowMode.ImageView;
                    state.imageContent = FileUtil.readImageBase64(p);
                }
                else {
                    state.windowMode = WindowMode.TextView;
                    state.textContent = FileUtil.readText(p);
                }
            }
        },
        escape(state) {
            state.commandMode = CommandMode.None;
            state.windowMode = WindowMode.Files;
            state.imageContent = '';
            state.textContent = '';
            state.targetPath = '';
        },
        gotoFirstLine(state) {
            state.cursorIndex[state.wid] = 0;
            updateScreenCursorOffset(state, -1);// 上方向として扱う
            saveCursorPosition(state);
        },
        gotoLastLine(state) {
            state.cursorIndex[state.wid] = state.fileList[state.wid].length - 1;
            updateScreenCursorOffset(state);
            saveCursorPosition(state);
        },
        gotoParentDir(state) {
            const p = path.dirname(state.currentDirectory[state.wid]);
            state.currentDirectory[state.wid] = p;
            loadCursorPosition(state);
            updateFileList(state, state.wid);
        },
        inputTextComplete(state, action) {
            if (!action.payload) {
                return;
            }
            const p = path.join(state.currentDirectory[state.wid], action.payload);
            switch (state.commandMode) {
                case CommandMode.MakeDirectory:
                    FileUtil.mkdir(p);
                    break;
                case CommandMode.Rename:
                    FileUtil.move(getCurrentPath(state, state.wid), p);
                    break;
                default:
                    break;
            }
            state.commandMode = CommandMode.None;
            state.windowMode = WindowMode.Files;
            updateFileList(state);
        },
        inputToMkdir(state) {
            state.commandMode = CommandMode.MakeDirectory;
            state.windowMode = WindowMode.InputText;
        },
        inputToRename(state) {
            state.targetPath = getCurrentPath(state, state.wid);
            state.commandMode = CommandMode.Rename;
            state.windowMode = WindowMode.InputText;
        },
        move(state) {
            const other = state.wid ^ 1;
            const fileInfo = state.fileList[state.wid][state.cursorIndex[state.wid]];
            const a = path.join(state.currentDirectory[state.wid], fileInfo.fileName);
            const b = path.join(state.currentDirectory[other], fileInfo.fileName);
            FileUtil.move(a, b);
            updateFileList(state);
        },
        readCurrentDir(state, action: PayloadAction<number>) {
            updateFileList(state, action.payload);
        },
        switchWindow(state) {
            state.wid ^= 1;
        },
        syncOtherWindow(state) {
            const p = state.currentDirectory[state.wid]
            const other = state.wid ^ 1;
            state.currentDirectory[other] = p;
            state.cursorIndex[other] = 0;
            state.screenCursorOffset[other] = 0;
            updateFileList(state, other);
        },
        toClipboardFilePath(state) {
            const fileInfo = state.fileList[state.wid][state.cursorIndex[state.wid]];
            const p = path.join(state.currentDirectory[state.wid], fileInfo.fileName);
            FileUtil.copyToClipboard(p);
        },
        upCursor(state, action: PayloadAction<number>) {
            moveCursor(state, -action.payload);
            saveCursorPosition(state);
        },
    },
});

export default slice.reducer;

// reducers のKey名のActionが自動生成される
export const {
    confirmed,
    confirmToDelete,
    copy,
    downCursor,
    enter,
    escape,
    gotoFirstLine,
    gotoLastLine,
    gotoParentDir,
    inputTextComplete,
    inputToMkdir,
    inputToRename,
    move,
    switchWindow,
    syncOtherWindow,
    toClipboardFilePath,
    readCurrentDir,
    upCursor,
} = slice.actions;