import { createEvent, createReducer } from '../core/redux';

export const setToStorage = createEvent('SET_TO_STORAGE');
export const loadFromStorage = createEvent('LOAD_FROM_STORAGE');

export default createReducer({})
    .on(setToStorage, (state, { key, value }) => ({
        ...state,
        [key]: value,
    }))
    .on(loadFromStorage, (state, payload) => ({
        ...state,
        ...payload.reduce((memo, { key, value }) => ({ ...memo, [key]: value }), {}),
    }));
