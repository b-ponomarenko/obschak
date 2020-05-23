import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Alert } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closePopout from '../../../../actions/closePopout';

const PaymentConfirmation = ({ payload }) => {
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
            <h2>Подтвердите перевод</h2>
            <p>
                Вы подтверждаете, что {user} отправил вам {amount} рублей?
            </p>
        </Alert>
    );
};

PaymentConfirmation.propTypes = {
    payload: pt.shape({
        user: pt.string,
        amount: pt.number,
    }),
};

export default PaymentConfirmation;
