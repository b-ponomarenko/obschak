import { createEvent, createReducer } from '../core/redux';

export const setNotifications = createEvent('SET_NOTIFICATION');

export default createReducer({}).on(setNotifications, (state, payload) => ({
    ...state,
    ...payload,
}));
