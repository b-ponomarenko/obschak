import { createEvent, createReducer } from '../core/redux';

export const setHistory = createEvent('SET_HISTORY');

export default createReducer([]).on(setHistory, (_, history) => history);
