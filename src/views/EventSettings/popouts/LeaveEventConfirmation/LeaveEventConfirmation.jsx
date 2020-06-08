import React, { useCallback } from 'react';
import pt from 'prop-types';
import { useDispatch } from 'react-redux';
import { Alert } from '@vkontakte/vkui';
import closePopout from '../../../../actions/closePopout';

const LeaveEventConfirmation = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const { onLeaveEvent } = payload;

    return (
        <Alert
            actionsLayout="vertical"
            actions={[
                {
                    title: 'Покинуть событие',
                    autoclose: true,
                    mode: 'destructive',
                    action: onLeaveEvent,
                },
                {
                    title: 'Отмена',
                    autoclose: true,
                    mode: 'cancel',
                },
            ]}
            onClose={handleClose}
        >
            <h2>Подтвердите действие</h2>
            <p>Вы уверены, что хотите покинуть событие? Это действие необратимо.</p>
        </Alert>
    );
};

LeaveEventConfirmation.propTypes = {
    payload: pt.object,
};

export default LeaveEventConfirmation;
