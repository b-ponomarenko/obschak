import { createEvent, createReducer } from '../core/redux';

export const setSnackbar = createEvent('SET_SNACKBAR');

export default createReducer({}).on(setSnackbar, (state, snackbar) => ({ ...state, snackbar }));
