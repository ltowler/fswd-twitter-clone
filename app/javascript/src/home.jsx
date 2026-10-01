import App from './components/App';
import React from 'react'
import ReactDOM from 'react-dom'

import './home.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  );
});
