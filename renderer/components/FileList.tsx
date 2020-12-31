import React from "react";
import styled from '@emotion/styled'
import CurrentDir from './CurrentDir';
import FileListRow from './FileListRow';

type Props = {
    wid: number;
}

const Container = styled.div( () => ({
    width: '50%',
}));

const arr = new Array(20).fill(null).map((_, i) => i);

const FileList: React.FC<Props> = ({ wid }) => {
    return (
        <Container>
            <CurrentDir wid={wid}></CurrentDir>
            {arr.map((no) => <FileListRow wid={wid} no={no} key={"ROW"+wid+"-"+no}></FileListRow>)}
        </Container>
    );
};

export default FileList;
