import { createEvent, createReducer } from '../core/redux';

export const eventLoaded = createEvent('EVENT_LOADED');

export default createReducer({}).on(eventLoaded, (state, event) => ({
    ...state,
    [event.id]: event,
}));
