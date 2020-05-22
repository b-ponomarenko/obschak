import { createEvent, createReducer } from '../core/redux';

export const eventsLoaded = createEvent('EVENTS_LOADED');

export default createReducer({}).on(eventsLoaded, (state, events) => ({ ...state, events }));
