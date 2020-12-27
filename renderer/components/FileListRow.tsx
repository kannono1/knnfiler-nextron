import React from "react";

type Props = {
    wid: number;
    no: number;
}

const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
        display: 'flex',
    },
    filename: {
        width: '50%',
    },
    filesize: {
        width: '20%',
    },
    updated: {
        width: '20%',
    },
};

const stylesActive: { [key: string]: React.CSSProperties } = {
    wrapper: {
        display: 'flex',
    },
    filename: {
        width: '50%',
        backgroundColor: 'green',
    },
    filesize: {
        width: '20%',
        backgroundColor: 'green',
    },
    updated: {
        width: '20%',
        backgroundColor: 'green',
    },
};

const isActive = (wid, no) => {
    return (wid == 0 && no == 0);
}

const FileListRow: React.FC<Props> = ({ wid, no }) => {
    return (
        <div style={(isActive(wid, no)) ? stylesActive.wrapper : styles.wrapper}>
            <div style={(isActive(wid, no)) ? stylesActive.filename : styles.filename}>FileName{wid}-{no}</div>
            <div style={(isActive(wid, no)) ? stylesActive.filesize : styles.filesize}>FileSize{wid}</div>
            <div style={(isActive(wid, no)) ? stylesActive.updated : styles.updated}>Updated{wid}</div>
        </div>
    );
};

export default FileListRow;

