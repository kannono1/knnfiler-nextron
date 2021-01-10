import { CursorInfo, CursorInfoDictionary } from "../data/CursorInfo";

export class CursorHistory {
    info: CursorInfoDictionary
    constructor() {
        this.info = {};
    }

    load(id: string): CursorInfo {
        if (id in this.info) {
            return this.info[id];
        }
        else {
            return {
                index: 0,
                offset: 0,
            }
        }
    }

    save(id: string, o: CursorInfo) {
        this.info[id] = o;
    }
}