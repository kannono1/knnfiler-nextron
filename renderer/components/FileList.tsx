import React from "react";
import styled from '@emotion/styled'
import { useSelector } from "react-redux";
import CurrentDir from './CurrentDir';
import FileListRow from './FileListRow';

type Props = {
    wid: number;
}

const Container = styled.div(() => ({
    width: '50%',
}));

const FileList: React.FC<Props> = ({ wid }) => {
    const screenCursorOffset = useSelector(state => state.files.screenCursorOffset[wid]);
    const rowNB = useSelector(state => state.files.fileListRowNB);
    const arr = new Array(rowNB).fill(null).map((_, i) => i);
    return (
        <Container>
            <CurrentDir wid={wid}></CurrentDir>
            {arr.map((no) => <FileListRow wid={wid} no={screenCursorOffset + no} key={"ROW" + wid + "-" + no}></FileListRow>)}
        </Container>
    );
};

export default FileList;
