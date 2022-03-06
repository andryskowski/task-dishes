import 'file-loader?name=[name].[ext]!./index.html';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';
import 'babel-polyfill'

const appElement = document.getElementById('app');

ReactDOM.render(<App />, appElement);