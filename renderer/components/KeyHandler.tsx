import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from '@emotion/styled'
import {
  confirmed,
  confirmToDelete,
  copy,
  downCursor,
  enter,
  escape,
  gotoFirstLine,
  gotoLastLine,
  gotoParentDir,
  inputToMkdir,
  inputToRename,
  move,
  switchWindow,
  syncOtherWindow,
  toClipboardFilePath,
  readCurrentDir,
  upCursor,
} from "../model/files";
import WindowMode from "../data/WindowMode";

const Container = styled.div(() => ({
  display: 'flex',
}));

const KeyHandler: React.FC = () => {
  const windowMode = useSelector(state => state.files.windowMode);
  const disptch = useDispatch();
  const wmode = useRef();
  wmode.current = windowMode;
  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode, ctrlKey, shiftKey } = event;
    console.log(`w1=:${wmode.current} keydown key:${key} code:${keyCode} crtl:${ctrlKey} shift:${shiftKey}`);
    switch (wmode.current) {
      case WindowMode.Files:
        switch (key) {
          case 'Enter':
            disptch(enter());
            break;
          case 'Tab':
            disptch(switchWindow());
            break;
          case 'c':
            disptch(copy());
            break;
          case 'd':
            disptch(confirmToDelete());
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
          case 'K':
            disptch(inputToMkdir());
            break;
          case 'l':
            disptch(enter());
            break;
          case 'm':
            disptch(move());
            break;
          case 'O':
            disptch(syncOtherWindow());
            break;
          case 'r':
            disptch(inputToRename());
            break;
          case 'y':
            disptch(toClipboardFilePath());
            break;
          default:
            break;
        }
        break;
      case WindowMode.ConfirmView:
        switch (key) {
          case 'Escape':
            disptch(escape());
            break;
          case 'y':
            disptch(confirmed());
            break;
          default:
            break;
        }
        break;
      default:
        switch (key) {
          case 'Escape':
            disptch(escape());
            break;
          default:
            break;
        }
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyPress, false);
    disptch(readCurrentDir(2));
  }, []);
  return (
    <Container>
    </Container>
  );
};

export default KeyHandler;
