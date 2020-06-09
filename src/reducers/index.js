import { applyMiddleware, combineReducers, createStore } from 'redux';
import modals from './modals';
import popout from './popout';
import events from './events';
import event from './event';
import user from './user';
import purchase from './purchase';
import vk from './vk';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { router5Middleware, router5Reducer } from 'redux-router5';

export default (router) =>
    createStore(
        combineReducers({
            router: router5Reducer,
            modals,
            popout,
            events,
            event,
            user,
            vk,
            purchase,
        }),
        composeWithDevTools(applyMiddleware(thunk, router5Middleware(router)))
    );
