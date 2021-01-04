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

const arr = new Array(30).fill(null).map((_, i) => i);

const FileList: React.FC<Props> = ({ wid }) => {
    const cursorIndex = useSelector(state => state.files.cursorIndex[wid]);
    return (
        <Container>
            <CurrentDir wid={wid}></CurrentDir>
            {arr.map((no) => <FileListRow wid={wid} no={cursorIndex + no} key={"ROW" + wid + "-" + no}></FileListRow>)}
        </Container>
    );
};

export default FileList;
