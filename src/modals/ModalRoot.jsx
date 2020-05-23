import React from 'react';
import { ModalRoot as ModalRootBase } from '@vkontakte/vkui';
import { getModals } from '../core/modals';
import closeModal from '../actions/closeModal';
import { connect } from 'react-redux';

const mapState = ({ modals }) => ({
    modal: modals.modal,
});

const mapDispatch = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
});

const ModalRoot = ({ modal, closeModal }) => {
    const { name, payload } = modal;
    const modals = getModals();

    return (
        <ModalRootBase activeModal={name} onClose={closeModal}>
            {modals.map(({ name, component: Component }) => (
                <Component key={name} id={name} payload={payload} currentModal={modal.name} />
            ))}
        </ModalRootBase>
    );
};

export default connect(mapState, mapDispatch)(ModalRoot);
