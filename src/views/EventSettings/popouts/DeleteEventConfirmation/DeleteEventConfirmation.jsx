import React, { useCallback } from 'react';
import pt from 'prop-types';
import { useDispatch } from 'react-redux';
import { Alert } from '@vkontakte/vkui';
import closePopout from '../../../../actions/closePopout';

const DeleteEventConfirmation = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const { onDeleteEvent } = payload;

    return (
        <Alert
            actionsLayout="vertical"
            actions={[
                {
                    title: 'Удалить событие',
                    autoclose: true,
                    mode: 'destructive',
                    action: onDeleteEvent,
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
            <p>Вы уверены, что хотите удалить событие? Это действие необратимо.</p>
        </Alert>
    );
};

DeleteEventConfirmation.propTypes = {
    payload: pt.object,
};

export default DeleteEventConfirmation;
