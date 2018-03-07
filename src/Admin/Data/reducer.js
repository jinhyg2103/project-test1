import { combineReducers } from 'redux';
import { authReducer } from './Authentification/reducer';
import { houseReducer } from './House/reducer';
import { userReducer } from './User/reducer';
import { reportReducer } from './Report/reducer';

export const reducer = combineReducers({
    auth: authReducer,
    house: houseReducer,
    user: userReducer,
    report: reportReducer,
});
