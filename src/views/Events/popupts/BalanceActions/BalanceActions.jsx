import React, { useCallback } from 'react';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import openPopout from '../../../../actions/openPopout';
import closePopout from '../../../../actions/closePopout';

const BalanceActions = (props) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const openPaymentConfirmationPopout = useCallback(
        () => dispatch(openPopout({ name: 'PAYMENT_CONFIRMATION', payload: {} })),
        []
    );
    const openSendPaymentRequestPopout = useCallback(
        () => dispatch(openPopout({ name: 'PAYMENT_CONFIRMATION', payload: {} })),
        []
    );

    return (
        <ActionSheet onClose={handleClose}>
            <ActionSheetItem onClick={openSendPaymentRequestPopout}>
                Запросить платеж
            </ActionSheetItem>
            <ActionSheetItem onClick={openPaymentConfirmationPopout}>
                Подтвердить перевод
            </ActionSheetItem>
            <ActionSheetItem autoclose mode="cancel">
                Отменить
            </ActionSheetItem>
        </ActionSheet>
    );
};

export default BalanceActions;
