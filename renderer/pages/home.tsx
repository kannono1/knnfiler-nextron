import React from 'react';
import { Provider } from "react-redux";
import store from "../model/";
import Head from 'next/head';
import FileLists from '../components/FileLists';

const Home = () => {

  return (
    <React.Fragment>
      <Head>
        <title>knnfiler-nextron</title>
      </Head>
      <Provider store={store}>
        <FileLists></FileLists>
      </Provider>
    </React.Fragment>
  );
};

export default Home;
