import React, { useCallback } from 'react';
import { Alert } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closePopout from '../../../../actions/closePopout';
import pt from 'prop-types';

const PaymentRequest = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const { user, amount } = payload;

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
                    action: () => console.log('Право на модерацию контента добавлено.'),
                },
            ]}
            onClose={handleClose}
        >
            <h2>Подтвердите действие</h2>
            <p>
                {user} получит запрос на отправление Вам {amount} р
            </p>
        </Alert>
    );
};

PaymentRequest.propTypes = {
    payload: pt.shape({
        user: pt.string,
        amount: pt.number,
    }),
};

export default PaymentRequest;
