import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from '@emotion/styled'
import WindowMode from '../data/WindowMode';

type CssProps = {
    mode: WindowMode;
}

const Container = styled.div<CssProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: ${props => props.mode == WindowMode.ConfirmView ? 'block' : 'none'};
`;

const ConfirmView = () => {
    const windowMode = useSelector(state => state.files.windowMode);
    const targetPath = useSelector(state => state.files.targetPath);
    return (
        <Container mode={windowMode}>
            <p>Confirm View: {targetPath}</p>
        </Container>
    );
};

export default ConfirmView;

