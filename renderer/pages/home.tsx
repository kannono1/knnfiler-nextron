import React from 'react';
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from "../model/";
import Head from 'next/head';
import FileLists from '../components/FileLists';
import TextView from '../components/TextView';
import ImageView from '../components/ImageView';
import InputTextView from '../components/InputTextView';
import KeyHandler from '../components/KeyHandler';

let persistor = persistStore(store)

const Home = () => {

  return (
    <React.Fragment>
      <Head>
        <title>knnfiler-nextron</title>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <KeyHandler></KeyHandler>
          <InputTextView></InputTextView>
          <TextView></TextView>
          <ImageView></ImageView>
          <FileLists></FileLists>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
};

export default Home;
