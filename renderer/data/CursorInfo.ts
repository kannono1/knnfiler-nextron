export interface CursorInfo {
    index: number;
    offset: number;
}

export interface CursorInfoDictionary {
    [id: string]: CursorInfo;
}
