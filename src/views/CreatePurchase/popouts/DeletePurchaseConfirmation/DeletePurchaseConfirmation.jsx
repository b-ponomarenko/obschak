import React, { useCallback } from 'react';
import pt from 'prop-types';
import { useDispatch } from 'react-redux';
import { Alert } from '@vkontakte/vkui';
import closePopout from '../../../../actions/closePopout';

const DeletePurchaseConfirmation = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const { onDelete } = payload;

    return (
        <Alert
            actionsLayout="vertical"
            actions={[
                {
                    title: 'Удалить',
                    autoclose: true,
                    mode: 'destructive',
                    action: onDelete,
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
            <p>Вы уверены, что хотите удалить покупку?</p>
        </Alert>
    );
};

DeletePurchaseConfirmation.propTypes = {
    payload: pt.object,
};

export default DeletePurchaseConfirmation;
