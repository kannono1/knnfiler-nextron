import React from 'react';
import { useSelector } from "react-redux";
import styled from '@emotion/styled'
import WindowMode from '../data/WindowMode';

type CssProps = {
    mode: WindowMode;
}

const Container = styled.pre<CssProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: ${props => props.mode == WindowMode.TextView ? 'block' : 'none'};
`;

const TextView = () => {
    const textContent = useSelector(state => state.files.textContent);
    const windowMode = useSelector(state => state.files.windowMode);
    return (
        <Container mode={windowMode}>{textContent}</Container>
    );
};

export default TextView;