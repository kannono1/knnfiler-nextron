import React from "react";
import styled from '@emotion/styled'
import { useSelector } from "react-redux";

type Props = {
    wid: number;
    no: number;
}

type DivProps = {
    active: Boolean;
}

const Container = styled.div(() => ({
    display: 'flex',
}));

const FileName = styled.div<DivProps>(props => ({
    width: '50%',
    backgroundColor: props.active && 'green',
}));

const FileSize = styled.div<DivProps>(props => ({
    width: '20%',
    backgroundColor: props.active && 'green',
}));

const Updated = styled.div<DivProps>(props => ({
    width: '20%',
    backgroundColor: props.active && 'green',
}));

const FileListRow: React.FC<Props> = ({ wid, no }) => {
    const cursorIndex = useSelector(state => state.files.cursorIndex);
    const isActive = (wid, no) => {
        return (wid == 0 && no == cursorIndex);
    }
    return (
        <Container>
            <FileName active={isActive(wid, no)}>FileName{wid}-{no}</FileName>
            <FileSize active={isActive(wid, no)}>FileSize{wid}</FileSize>
            <Updated active={isActive(wid, no)}>Updated{wid}</Updated>
        </Container>
    );
};

export default FileListRow;

