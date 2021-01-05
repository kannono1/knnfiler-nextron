import React from 'react';
import { Provider } from "react-redux";
import store from "../model/";
import Head from 'next/head';
import FileLists from '../components/FileLists';
import TextView from '../components/TextView';

const Home = () => {

  return (
    <React.Fragment>
      <Head>
        <title>knnfiler-nextron</title>
      </Head>
      <Provider store={store}>
        <TextView></TextView>
        <FileLists></FileLists>
      </Provider>
    </React.Fragment>
  );
};

export default Home;
