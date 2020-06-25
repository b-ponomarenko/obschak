import React, { useCallback } from 'react';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import openPopout from '../../../../actions/openPopout';
import closePopout from '../../../../actions/closePopout';
import pt from 'prop-types';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import openPayFrom from '../../../../actions/vk/openPayFrom';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';
import createTransfer from '../../../../actions/events/createTransfer';
import openModal from '../../../../actions/openModal';
import fetchEventWithUsers from '../../../../actions/fetchEventWithUsers';
import openSnackbar from '../../../../actions/openSnackbar';
import { hideSpinner, showSpinner } from '../../../../actions/spinner';

const BalanceActions = (props) => {
    const { payload } = props;
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const openPaymentConfirmationPopout = useCallback(
        () => dispatch(openPopout({ name: 'PAYMENT_CONFIRMATION', payload })),
        [payload]
    );
    const currentUser = useCurrentUser();
    const event = useCurrentEvent();
    const { from, to, value } = payload;
    const users = useSelector(({ user }) => user);
    const openVkPayFrom = useCallback(() => {
        handleClose();
        return dispatch(
            openPayFrom({
                to,
                value,
                description: `Денежный перевод из приложения «Общак» за событие «${event.title}»`,
            })
        )
            .then((data) => {
                const { status } = data;

                if (!status) {
                    return;
                }

                dispatch(showSpinner());
                return dispatch(createTransfer(event.id, payload))
                    .then(() =>
                        dispatch(
                            openModal({
                                name: 'SUCCESS_TRANSFER',
                                payload: { user: users[to] },
                            })
                        )
                    )
                    .then(() => dispatch(fetchEventWithUsers(event.id)))
                    .finally(() => dispatch(hideSpinner()));
            })
            .catch(() =>
                dispatch(
                    openSnackbar({
                        children: 'Не удалось выполнить оплату, повторите попытку позже',
                        type: 'error',
                    })
                )
            );
    }, [payload]);

    return (
        <ActionSheet onClose={handleClose}>
            <ActionSheetItem onClick={openPaymentConfirmationPopout}>
                Подтвердить оплату
            </ActionSheetItem>
            {currentUser.id === from && (
                <ActionSheetItem onClick={openVkPayFrom}>Отправить деньги</ActionSheetItem>
            )}
            <ActionSheetItem autoclose mode="cancel">
                Отменить
            </ActionSheetItem>
        </ActionSheet>
    );
};

BalanceActions.propTypes = {
    payload: pt.object,
};

export default BalanceActions;
