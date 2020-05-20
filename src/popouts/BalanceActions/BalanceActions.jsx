import React, { useCallback } from 'react';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closePopout from '../../actions/closePopout';

const BalanceActions = (props) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);

    return (
        <ActionSheet onClose={handleClose}>
            <ActionSheetItem>Запросить платеж</ActionSheetItem>
            <ActionSheetItem>Отметить как завершенное</ActionSheetItem>
            <ActionSheetItem autoclose mode="cancel">
                Отменить
            </ActionSheetItem>
        </ActionSheet>
    );
};

export default BalanceActions;
