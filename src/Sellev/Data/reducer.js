import { combineReducers } from 'redux';
import { authReducer } from './Authentification/reducer';

export const reducer = combineReducers({
    auth: authReducer,
});
