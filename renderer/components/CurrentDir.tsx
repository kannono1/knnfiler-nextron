import React from "react";
import styled from '@emotion/styled'
import { useSelector } from "react-redux";

type Props = {
    wid: number;
}

const Container = styled.div( () => ({
}));

const CurrentDir: React.FC<Props> = ({ wid }) => {
    const currentDir = useSelector(state => state.files.currentDirectory[wid]);
    return <Container>{currentDir}</Container>;
};

export default CurrentDir;

