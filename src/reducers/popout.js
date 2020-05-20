import { createEvent, createReducer } from '../core/redux';

export const setPopout = createEvent('SET_POPOUT');

export default createReducer({ popout: {} }).on(setPopout, (state, { name, payload }) => ({
    popout: { name, payload },
}));
