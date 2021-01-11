import fs from 'fs';
import path from 'path';
import copy from 'copy-to-clipboard';

export const copyToClipboard = (t) => {
    copy(t);
}

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

export const mkdir = (p) => {
    fs.mkdirSync(p);
};

export const readImageBase64 = (p) => {
    const b = fs.readFileSync(p);
    return b.toString('base64')
};

export const readText = (p) => {
    const t = fs.readFileSync(p);
    return t.toString();
};

export const readDir = (dir) => {
    const files = fs.readdirSync(dir);
    return files.map((fn) => {
        return getFileInfo(path.join(dir, fn));
    });
};