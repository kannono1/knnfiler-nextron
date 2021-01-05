import React from "react";
import styled from '@emotion/styled'
import { useSelector } from "react-redux";
import { FileInfo } from '../data/FileInfo';

type Props = {
    wid: number;
    no: number;
}

type CssProps = {
    active: Boolean;
    isdir?: Boolean;
}

const Container = styled.div(() => ({
    display: 'flex',
}));

const FileName = styled.div<CssProps>(props => ({
    width: '50%',
    color: props.isdir && 'yellow',
    backgroundColor: props.active && 'green',
}));

const FileSize = styled.div<CssProps>(props => ({
    width: '15%',
    textAlign: 'right',
    color: props.isdir && 'yellow',
    backgroundColor: props.active && 'green',
}));

const Updated = styled.div<CssProps>(props => ({
    width: '30%',
    textAlign: 'right',
    color: props.isdir && 'yellow',
    backgroundColor: props.active && 'green',
}));

const FileListRow: React.FC<Props> = ({ wid, no }) => {
    const cursorIndex = useSelector(state => state.files.cursorIndex[wid]);
    const Wid = useSelector(state => state.files.wid);
    const fileInfo: FileInfo = useSelector(state => state.files.fileList[wid][no]);
    const isActive = (wid, no) => {
        return (wid == Wid && no == cursorIndex);
    }
    return (
        <Container>
            <FileName active={isActive(wid, no)} isdir={(fileInfo == null) ? false : fileInfo.isDir}>{(fileInfo == null) ? '' : fileInfo.fileName}</FileName>
            <FileSize active={isActive(wid, no)} isdir={(fileInfo == null) ? false : fileInfo.isDir}>{(fileInfo == null) ? '' : (fileInfo.isDir) ? 'DIR' : fileInfo.fileSize.toLocaleString()}</FileSize>
            <Updated active={isActive(wid, no)} isdir={(fileInfo == null) ? false : fileInfo.isDir}>{(fileInfo == null) ? '' : fileInfo.updated}</Updated>
        </Container>
    );
};

export default FileListRow;

