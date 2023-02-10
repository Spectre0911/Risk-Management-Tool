import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

// REDUX
import {ProSidebarProvider} from 'react-pro-sidebar';

ReactDOM.render(
    <ProSidebarProvider>
        <App />
    </ProSidebarProvider>,
document.getElementById('root'),

);