import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from '@emotion/styled'
import {
  toClipboardFilePath,
  downCursor,
  enter,
  escape,
  gotoFirstLine,
  gotoLastLine,
  gotoParentDir,
  switchWindow,
  syncOtherWindow,
  readCurrentDir,
  upCursor,
} from "../model/files";

const Container = styled.div(() => ({
  display: 'flex',
}));

const KeyHandler: React.FC = () => {
  const disptch = useDispatch();
  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode, ctrlKey, shiftKey } = event;
    console.log(`keydown key:${key} code:${keyCode} crtl:${ctrlKey} shift:${shiftKey}`);
    switch (key) {
      case 'Escape':
        disptch(escape());
        break;
      case 'Tab':
        disptch(switchWindow());
        break;
      case 'g':
        disptch(gotoFirstLine());
        break;
      case 'G':
        disptch(gotoLastLine());
        break;
      case 'h':
        disptch(gotoParentDir());
        break;
      case 'j':
        disptch(downCursor(1));
        break;
      case 'k':
        disptch(upCursor(1));
        break;
      case 'l':
        disptch(enter());
        break;
      case 'O':
        disptch(syncOtherWindow());
        break;
      case 'y':
        disptch(toClipboardFilePath());
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
    </Container>
  );
};

export default KeyHandler;
