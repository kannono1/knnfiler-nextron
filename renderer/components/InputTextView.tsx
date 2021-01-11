import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from '@emotion/styled'
import WindowMode from '../data/WindowMode';
import { inputTextComplete } from '../model/files';

type CssProps = {
    mode: WindowMode;
}

const Container = styled.div<CssProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    display: ${props => props.mode == WindowMode.InputText ? 'block' : 'none'};
`;

const InputTextView = () => {
    const disptch = useDispatch();
    const commandMode = useSelector(state => state.files.commandMode);
    const windowMode = useSelector(state => state.files.windowMode);
    const inputEl = useRef(null);
    useEffect(() => {
        inputEl.current.value = '';
        inputEl.current.focus();
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        disptch(inputTextComplete(inputEl.current.value));
    }
    return (
        <Container mode={windowMode}>
            <p>Input Text View: {commandMode}</p>
            <form onSubmit={handleSubmit}>
                <input type='text' ref={inputEl}></input>
            </form>
        </Container>
    );
};

export default InputTextView;
