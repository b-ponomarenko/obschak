import { applyMiddleware, combineReducers, createStore } from 'redux';
import router from './router';
import modals from './modals';
import popout from './popout';
import events from './events';
import event from './event';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
    combineReducers({ router, modals, popout, events, event }),
    composeWithDevTools(applyMiddleware(thunk))
);
