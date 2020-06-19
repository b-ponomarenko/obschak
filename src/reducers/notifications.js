import { createEvent, createReducer } from '../core/redux';
import { parse } from 'query-string';

export const setNotifications = createEvent('SET_NOTIFICATION');

const { vk_are_notifications_enabled } = parse(window.location.search);

export default createReducer({ all: vk_are_notifications_enabled === '1' }).on(
    setNotifications,
    (state, payload) => ({
        ...state,
        ...payload,
    })
);
