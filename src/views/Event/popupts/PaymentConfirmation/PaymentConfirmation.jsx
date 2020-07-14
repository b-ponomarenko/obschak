import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Alert, ANDROID, usePlatform } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import closePopout from '../../../../actions/closePopout';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import { currencies } from '../../../../conts/currencies';
import fetchEventWithUsers from '../../../../actions/fetchEventWithUsers';
import createTransfer from '../../../../actions/events/createTransfer';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';
import sendNotification from '../../../../actions/vk/sendNotification';
import petrovich from 'petrovich';
import openModal from '../../../../actions/openModal';
import { hideSpinner, showSpinner } from '../../../../actions/spinner';

const PaymentConfirmation = ({ payload }) => {
    const platform = usePlatform();
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const event = useCurrentEvent();
    const { from, to, value, currency } = payload;
    const user = useSelector(({ user }) => user);
    const userFrom = user[from];
    const userTo = user[to];
    const currentUser = useCurrentUser();
    const handleCreateTransfer = useCallback(() => {
        dispatch(showSpinner());
        dispatch(createTransfer(event.id, payload))
            .then(() => {
                if (userTo.id === currentUser.id) {
                    return;
                }

                dispatch(
                    sendNotification({
                        userId: userTo.id,
                        message: `${userFrom.first_name} ${userFrom.last_name} отправил${
                            userFrom.sex === 1 ? 'а' : ''
                        } Вам ${value.toLocaleString('ru-RU')} ${
                            currencies[currency]
                        }. Проверьте баланс своего счета`,
                    })
                );
            })
            .then(() => dispatch(fetchEventWithUsers(event.id)))
            .then(() => {
                if (userTo.id === currentUser.id) {
                    return;
                }

                return dispatch(
                    openModal({
                        name: 'SUCCESS_TRANSFER',
                        payload: { user: userTo },
                    })
                );
            })
            .finally(() => dispatch(hideSpinner()));
    }, [event, payload, currentUser]);
    const personTo = petrovich(
        {
            first: userTo.first_name,
            gender: userTo.sex === 1 ? 'female' : 'male',
        },
        'dative'
    ).first;

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
                    action: handleCreateTransfer,
                },
            ]}
            onClose={handleClose}
        >
            <h2>Подтвердите оплату</h2>
            <p>
                Вы подтверждаете, что {userFrom.id === currentUser.id ? 'Вы' : userFrom.first_name}{' '}
                отправил{userFrom.id === currentUser.id ? 'и' : userFrom.sex === 1 ? 'а' : ''}{' '}
                {userTo.id === currentUser.id ? 'Вам' : personTo} {value.toLocaleString('ru-RU')}{' '}
                {currencies[currency]}?
            </p>
        </Alert>
    );
};

PaymentConfirmation.propTypes = {
    payload: pt.object,
};

export default PaymentConfirmation;
