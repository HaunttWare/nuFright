import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const el: HTMLElement | null = document.getElementById('root');
if (!el) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(el);

root.render(<App />);