import { createEvent, createReducer } from '../core/redux';

export const userLoaded = createEvent('USER_LOADED');

export default createReducer({}).on(userLoaded, (state, user) => ({ ...state, [user.id]: user }));
