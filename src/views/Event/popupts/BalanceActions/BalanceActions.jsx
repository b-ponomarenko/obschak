import React, { useCallback } from 'react';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import openPopout from '../../../../actions/openPopout';
import closePopout from '../../../../actions/closePopout';
import pt from 'prop-types';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import openPayFrom from '../../../../actions/vk/openPayFrom';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';

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
    const openVkPayFrom = useCallback(
        () => dispatch(openPayFrom({ to, value, description: `За событие "${event.title}"` })),
        [payload]
    );

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
