import React from "react";
import styled from '@emotion/styled'
import FileList from './FileList';

const Container = styled.div(() => ({
  display: 'flex',
}));

const FileLists: React.FC = () => {
  return (
    <Container>
      <FileList wid={0}></FileList>
      <FileList wid={1}></FileList>
    </Container>
  );
};

export default FileLists;
