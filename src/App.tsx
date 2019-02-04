import React from 'react';
import './App.css';
import CurrentPost from './CurrentPost';
import NextPost from './NextPost';
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <div className="App">
    <Provider store={store}>
      <CurrentPost />
      <NextPost />
    </Provider>
  </div>
);

export default App;
