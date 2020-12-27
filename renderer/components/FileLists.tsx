import React from "react";
import FileList from './FileList';

const style: React.CSSProperties = {
    display: 'flex',
};

const FileLists: React.FC = () => {
    return (
        <div style={style}>
            <FileList wid={0}></FileList>
            <FileList wid={1}></FileList>
        </div>
    );
};

export default FileLists;
