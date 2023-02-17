import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';
import { Provider } from 'react-redux';
import {store} from "./store";
import App from './App';

// REDUX
import {ProSidebarProvider} from 'react-pro-sidebar';

ReactDOM.render(
    <Provider store={store}>
        <ProSidebarProvider>
            <App />
        </ProSidebarProvider>
    </Provider>,
document.getElementById('root'),

);