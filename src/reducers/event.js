import { createEvent, createReducer } from '../core/redux';

export const eventLoaded = createEvent('EVENT_LOADED');
export const eventRemoved = createEvent('EVENT_REMOVED');

export default createReducer({})
    .on(eventLoaded, (state, event) => ({
        ...state,
        [event.id]: event,
    }))
    .on(eventRemoved, (state, eventId) => ({
        ...state,
        [eventId]: undefined,
    }));
