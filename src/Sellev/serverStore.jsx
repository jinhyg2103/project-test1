import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as dataReducer } from './Data/reducer';

export default () => {
    const appReducer = combineReducers({
        data: dataReducer,
    });
    const enhancer = compose(
        applyMiddleware( thunk )
    );
    return createStore(
        appReducer,
        enhancer,
    );
};
