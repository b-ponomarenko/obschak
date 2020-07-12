import { createEvent, createReducer } from '../core/redux';

export const setModal = createEvent('SET_MODAL');

export default createReducer({ modal: {} }).on(setModal, (state, { payload }) => ({
    modal: { payload },
}));
