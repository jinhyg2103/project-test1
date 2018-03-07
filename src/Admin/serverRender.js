// React
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-router-server';

// React Router
//import ReactApp from './App';

// Actions
import * as ActionAuth from './Data/Authentification/actions';

import ServerStore from './serverStore';

const serverRender = {
    /*
     * @params query.request
     * @params query.response
     * @params query.data
     * @params query.store
     * @params query.author
     */
    default: (query, callback) => {
        query.store = ServerStore();
        if (query.author) query.store.dispatch({ type: ActionAuth.actionTypes.LOGIN, author: query.author });
        callback(null, null, query.store);
    },
}
module.exports = serverRender;
