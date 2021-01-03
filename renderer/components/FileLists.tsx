import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from '@emotion/styled'
import FileList from './FileList';
import { downCursor, switchWindow, readCurrentDir, upCursor } from "../model/files";

const Container = styled.div(() => ({
  display: 'flex',
}));

const FileLists: React.FC = () => {
  const disptch = useDispatch();
  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event;
    console.log('keydown', key, keyCode);
    switch (key) {
      case 'Tab':
        disptch(switchWindow());
        break;
      case 'j':
        disptch(downCursor(1));
        break;
      case 'k':
        disptch(upCursor(1));
        break;
      default:
        break;
    }
  }, []);

  const handleUserKeyUp = useCallback(event => {
    const { key, keyCode } = event;
    console.log('keyup', key, keyCode);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyPress, false);
    document.addEventListener('keyup', handleUserKeyUp, false);
    disptch(readCurrentDir(0));
    disptch(readCurrentDir(1));
  });
  return (
    <Container>
      <FileList wid={0}></FileList>
      <FileList wid={1}></FileList>
    </Container>
  );
};

export default FileLists;
