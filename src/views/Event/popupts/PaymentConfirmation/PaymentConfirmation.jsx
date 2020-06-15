import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Alert } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import closePopout from '../../../../actions/closePopout';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import { currencies } from '../../../../conts/currencies';
import fetchEventWithUsers from '../../../../actions/fetchEventWithUsers';
import createTransfer from '../../../../actions/events/createTransfer';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';
import openPopout from '../../../../actions/openPopout';

const PaymentConfirmation = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const event = useCurrentEvent();
    const { from, to, value, currency } = payload;
    const user = useSelector(({ user }) => user);
    const userFrom = user[from];
    const userTo = user[to];
    const handleCreateTransfer = useCallback(() => {
        dispatch(openPopout({ name: 'SCREEN_SPINNER' }));
        dispatch(createTransfer(event.id, payload))
            .then(() => dispatch(fetchEventWithUsers(event.id)))
            .finally(() => dispatch(closePopout()));
    }, [event, payload]);
    const currentUser = useCurrentUser();

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
                    action: handleCreateTransfer,
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
