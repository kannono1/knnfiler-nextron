import fs from 'fs-extra';
import path from 'path';
import copyClipboard from 'copy-to-clipboard';

export const copy = (a, b) => {
    fs.copySync(a, b);
}

export const copyToClipboard = (t) => {
    copyClipboard(t);
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

export const move = (a, b) => {
    fs.moveSync(a, b);
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