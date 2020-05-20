import React, { useCallback } from 'react';
import { ModalRoot } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import { getModals } from '../core/modals';
import closeModal from '../actions/closeModal';

export default () => {
    const { name, payload } = useSelector(({ modals }) => modals.modal);
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeModal()), []);
    const modals = getModals();

    return (
        <ModalRoot activeModal={name} onClose={handleClose}>
            {modals.map(({ name, component: Component }) => (
                <Component key={name} id={name} payload={payload} />
            ))}
        </ModalRoot>
    );
};
