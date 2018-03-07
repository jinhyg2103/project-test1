import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as dataReducer } from './Data/reducer';

const appReducer = combineReducers({
    data: dataReducer,
});

const enhancer = compose(
    applyMiddleware(thunk),
);

let store;
if (typeof window !== 'undefined') {
    const preloadedState = JSON.parse(window.__PRELOADED_STATE__);
    store = createStore(
        appReducer,
        preloadedState,
        enhancer,
    );
    delete window.__PRELOADED_STATE__;
} else {
    store = createStore(
        appReducer,
        enhancer,
    );
}
export default store;

export const newStore = createStore(
    appReducer,
    enhancer,
);

