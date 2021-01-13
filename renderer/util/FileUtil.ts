import fs from 'fs-extra';
import path from 'path';
import copyClipboard from 'copy-to-clipboard';

export const copy = (a:string, b:string) => {
    fs.copySync(a, b);
}

export const copyToClipboard = (t:string) => {
    copyClipboard(t);
}

export const remove = (a:string) => {
    fs.removeSync(a);
}

const getFileInfo = (p:string) => {
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

export const mkdir = (p:string) => {
    fs.mkdirSync(p);
};

export const move = (a:string, b:string) => {
    fs.moveSync(a, b);
};

export const readImageBase64 = (p:string) => {
    const b = fs.readFileSync(p);
    return b.toString('base64')
};

export const readText = (p:string) => {
    const t = fs.readFileSync(p);
    return t.toString();
};

export const readDir = (dir:string) => {
    const files = fs.readdirSync(dir);
    return files.map((fn) => {
        return getFileInfo(path.join(dir, fn));
    });
};