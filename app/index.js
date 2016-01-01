import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/app';

console.log('test');

const root = document.getElementById('react-root')

document.addEventListener('DOMContentLoaded', ()=> ReactDOM.render(<App />, root));
