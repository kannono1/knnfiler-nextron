import React from "react";
import styled from '@emotion/styled'

type Props = {
    wid: number;
}

const Container = styled.div( () => ({
    width: '50%',
}));

const CurrentDir: React.FC<Props> = ({ wid }) => {
    return <Container>CurrentDir{wid}</Container>;
};

export default CurrentDir;

