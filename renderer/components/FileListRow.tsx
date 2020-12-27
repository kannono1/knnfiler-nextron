import React from "react";

type Props = {
    wid: number;
    no: number;
}

const styles: {[key:string]:React.CSSProperties} = {
    wrapper:{
        display: 'flex',
        border: '1px solid',
    },
    filename:{
        width: '50%',
        backgroundColor: 'red',
    },
    filesize:{
        width: '20%',
        backgroundColor: 'yellow',
    },
    updated:{
        width: '20%',
        backgroundColor: 'blue',
    },
};

const FileListRow: React.FC<Props> = ({ wid, no }) => {
    return (
        <div style={styles.wrapper}>
            <div style={styles.filename}>FileName{wid}-{no}</div>
            <div style={styles.filesize}>FileSize{wid}</div>
            <div style={styles.updated}>Updated{wid}</div>
        </div>
    );
};

export default FileListRow;

