import React from "react";
import CurrentDir from './CurrentDir';
import FileListRow from './FileListRow';

type Props = {
    wid: number;
}

const style: React.CSSProperties = {
    width: '50%',
};

const FileList: React.FC<Props> = ({ wid }) => {
    return (
        <div style={style}>
            <CurrentDir wid={wid}></CurrentDir>
            <FileListRow wid={wid} no={0}></FileListRow>
            <FileListRow wid={wid} no={1}></FileListRow>
        </div>
    );
};

export default FileList;
