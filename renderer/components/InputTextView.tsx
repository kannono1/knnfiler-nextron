import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from '@emotion/styled';
import path from 'path';
import WindowMode from '../data/WindowMode';
import { inputTextComplete } from '../model/files';
import CommandMode from '../data/CommandMode';

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
    const targetPath = useSelector(state => state.files.targetPath);
    const inputEl = useRef(null);
    useEffect(() => {
        switch (commandMode) {
            case CommandMode.Delete:
                inputEl.current.value = '';
                break;
            case CommandMode.Rename:
                inputEl.current.value = path.basename(targetPath);
                break;
            default:
                break;
        }
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
