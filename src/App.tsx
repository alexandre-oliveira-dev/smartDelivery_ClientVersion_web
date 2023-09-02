/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouterApp from './service/router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterApp></RouterApp>
      </BrowserRouter>
    </div>
  );
}

export default App;
