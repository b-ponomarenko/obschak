import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Alert } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import closePopout from '../../../../actions/closePopout';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import { currencies } from '../../../../conts/currencies';

const PaymentConfirmation = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const user = useSelector(({ user }) => user);
    const currentUser = useCurrentUser();
    const { from, to, value, currency } = payload;
    const userFrom = user[from];
    const userTo = user[to];

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
            <h2>Подтвердите оплату</h2>
            <p>
                Вы подтверждаете, что {userFrom.id === currentUser.id ? 'Вы' : userFrom.first_name}{' '}
                отправил {userTo.id === currentUser.id ? 'Вам' : userTo?.first_name}{' '}
                {value.toLocaleString('ru')} {currencies[currency]}?
            </p>
        </Alert>
    );
};

PaymentConfirmation.propTypes = {
    payload: pt.object,
};

export default PaymentConfirmation;
