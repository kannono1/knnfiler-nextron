import React from "react";
import CurrentDir from './CurrentDir';
import FileListRow from './FileListRow';

type Props = {
    wid: number;
}

const style: React.CSSProperties = {
    width: '50%',
};

const arr = new Array(20).fill(null).map((_, i) => i);

const FileList: React.FC<Props> = ({ wid }) => {
    return (
        <div style={style}>
            <CurrentDir wid={wid}></CurrentDir>
            {arr.map((no) => <FileListRow wid={wid} no={no}></FileListRow>)}
        </div>
    );
};

export default FileList;
