import React, { useCallback } from 'react';
import { ModalRoot as ModalRootBase } from '@vkontakte/vkui';
import { getModals } from '../core/modals';
import closeModal from '../actions/closeModal';
import { useDispatch, useSelector } from 'react-redux';

const ModalRoot = () => {
    const { modal = null } = useSelector(({ router }) => router.route.params);
    const { payload } = useSelector(({ modals }) => modals.modal);
    const modals = getModals();
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeModal()), []);

    return (
        <ModalRootBase activeModal={modal} onClose={handleClose}>
            {modals.map(({ name, component: Component }) => (
                <Component key={name} id={name} payload={payload} currentModal={modal} />
            ))}
        </ModalRootBase>
    );
};

export default ModalRoot;
