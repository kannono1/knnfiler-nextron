import React from 'react';
import { useSelector } from "react-redux";
import styled from '@emotion/styled'
import WindowMode from '../data/WindowMode';

type CssProps = {
    mode: WindowMode;
}

const Container = styled.div<CssProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: ${props => props.mode == WindowMode.ImageView ? 'block' : 'none'};
`;

const ImageView = () => {
    const imageContent = useSelector(state => state.files.imageContent);
    const windowMode = useSelector(state => state.files.windowMode);
    const p = 'data:image/png;base64,' + imageContent;
    return (
        <Container mode={windowMode}><img src={p}></img></Container>
    );
};

export default ImageView;
