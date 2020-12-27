import React from 'react';
import Head from 'next/head';
import FileList from '../components/FileList';

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>knnfiler-nextron</title>
      </Head>
      <div>
        <FileList wid={0}></FileList>
        <FileList wid={1}></FileList>
      </div>
    </React.Fragment>
  );
};

export default Home;
