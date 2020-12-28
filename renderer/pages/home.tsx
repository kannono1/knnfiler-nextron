import React, { useEffect, useCallback } from 'react';
import Head from 'next/head';
import FileLists from '../components/FileLists';

const Home = () => {
  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event;
    console.log('keydown', key, keyCode);
    switch (key) {
      case 'j': console.log('=== j'); break;
      default: break;
    }
  }, []);

  const handleUserKeyUp = useCallback(event => {
    const { key, keyCode } = event;
    console.log('keyup', key, keyCode);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyPress, false);
    document.addEventListener('keyup', handleUserKeyUp, false);
  });

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
