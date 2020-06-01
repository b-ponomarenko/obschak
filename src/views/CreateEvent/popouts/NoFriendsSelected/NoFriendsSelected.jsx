import React, { useCallback } from 'react';
import { Alert } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closePopout from '../../../../actions/closePopout';

const NoFriendsSelected = () => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);

    return (
        <Alert
            actions={[
                {
                    title: 'Хорошо',
                    autoclose: true,
                    mode: 'cancel',
                },
            ]}
            onClose={handleClose}
        >
            <h2>Ни одного друга не выбрано</h2>
            <p>Для того, чтобы создать событие Вам необходимо добавить хотя бы одного друга</p>
        </Alert>
    );
};

export default NoFriendsSelected;
