import { createEvent, createReducer } from '../core/redux';

export const setCurrentRoute = createEvent('SET_CURRENT_ROUTE');

export default createReducer({ currentRoute: { name: 'events', params: {} } }).on(
    setCurrentRoute,
    (state, currentRoute) => ({ currentRoute })
);
