import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Alert, ANDROID, usePlatform } from '@vkontakte/vkui';
import closePopout from '../../../../actions/closePopout';
import { useDispatch } from 'react-redux';
import deleteTransfer from '../../../../actions/events/deleteTransfer';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';
import eventById from '../../../../actions/events/eventById';
import { hideSpinner, showSpinner } from '../../../../actions/spinner';

const CancelTransferConfirmation = ({ payload }) => {
    const platform = usePlatform();
    const dispatch = useDispatch();
    const { id } = payload;
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const event = useCurrentEvent();
    const handleDeleteTransfer = useCallback(() => {
        dispatch(showSpinner());
        return dispatch(deleteTransfer(id))
            .then(() => dispatch(eventById(event.id)))
            .finally(() => dispatch(hideSpinner()));
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
                    mode: platform === ANDROID ? 'destructive' : 'default',
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
