import 'core-js/shim';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

// Components
import App from './App';

require('es6-promise').polyfill();
require('console-polyfill');
require('core-js/shim');

render(
    <AppContainer>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'),
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = App.default;
        render(
            <AppContainer>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </AppContainer>,
            document.getElementById('root'),
        );
    });
}

