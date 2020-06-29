import { applyMiddleware, combineReducers, createStore } from 'redux';
import modals from './modals';
import popout from './popout';
import events from './events';
import event from './event';
import user from './user';
import purchase from './purchase';
import snackbar from './snackbar';
import history from './history';
import vk from './vk';
import notifications from './notifications';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { router5Middleware, router5Reducer } from 'redux-router5';
import historyPlugin from '../core/historyPlugin';

export default (router) => {
    const store = createStore(
        combineReducers({
            router: router5Reducer,
            modals,
            popout,
            events,
            event,
            user,
            vk,
            purchase,
            notifications,
            snackbar,
            history,
        }),
        composeWithDevTools(applyMiddleware(thunk, router5Middleware(router)))
    );

    router.usePlugin(historyPlugin(store));

    return store;
};
