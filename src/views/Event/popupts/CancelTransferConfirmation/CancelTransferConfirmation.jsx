import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Alert } from '@vkontakte/vkui';
import closePopout from '../../../../actions/closePopout';
import { useDispatch } from 'react-redux';
import deleteTransfer from '../../../../actions/events/deleteTransfer';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';
import eventById from '../../../../actions/events/eventById';
import openPopout from '../../../../actions/openPopout';

const CancelTransferConfirmation = ({ payload }) => {
    const dispatch = useDispatch();
    const { id } = payload;
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const event = useCurrentEvent();
    const handleDeleteTransfer = useCallback(() => {
        dispatch(openPopout({ name: 'SCREEN_SPINNER' }));
        return dispatch(deleteTransfer(id))
            .then(() => dispatch(eventById(event.id)))
            .finally(() => dispatch(closePopout()));
    }, [id, event]);

    return (
        <Alert
            actions={[
                {
                    title: 'Отмена',
                    autoclose: true,
                    mode: 'cancel',
                },
                {
                    title: 'Да',
                    autoclose: true,
                    action: handleDeleteTransfer,
                },
            ]}
            onClose={handleClose}
        >
            <h2>Отменить перевод</h2>
            <p>Вы уверены, что хотите отменить денежный перевод?</p>
        </Alert>
    );
};

CancelTransferConfirmation.propTypes = {
    payload: pt.object,
};

export default CancelTransferConfirmation;
