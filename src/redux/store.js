import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/root.reducer';

export default store = createStore(rootReducer, {}, applyMiddleware(thunk));