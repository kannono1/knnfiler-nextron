import React from 'react';
import Head from 'next/head';
import FileLists from '../components/FileLists';

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>knnfiler-nextron</title>
      </Head>
      <FileLists></FileLists>
    </React.Fragment>
  );
};

export default Home;
