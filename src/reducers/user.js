import { createEvent, createReducer } from '../core/redux';

export const userLoaded = createEvent('USER_LOADED');
export const usersLoaded = createEvent('USERS_LOADED');

export default createReducer({})
    .on(userLoaded, (state, user) => ({ ...state, [user.id]: user }))
    .on(usersLoaded, (state, users) => ({
        ...state,
        ...users.reduce((memo, user) => ({ ...memo, [user.id]: user }), {}),
    }));
