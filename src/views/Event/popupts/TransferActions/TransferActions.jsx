import React, { useCallback } from 'react';
import pt from 'prop-types';
import { ActionSheet, ActionSheetItem, IOS, usePlatform } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closePopout from '../../../../actions/closePopout';
import openPopout from '../../../../actions/openPopout';

const TransferActions = ({ payload }) => {
    const platform = usePlatform();
    const dispatch = useDispatch();
    const { id } = payload;
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const handleCancelTransfer = useCallback(
        () =>
            dispatch(
                openPopout({ name: 'CANCEL_TRANSFER_CONFIRMATION', payload: { id }, replace: true })
            ),
        [id]
    );

    return (
        <ActionSheet onClose={handleClose}>
            <ActionSheetItem onClick={handleCancelTransfer}>Отменить перевод</ActionSheetItem>
            {platform === IOS && (
                <ActionSheetItem autoclose mode="cancel">
                    Отменить
                </ActionSheetItem>
            )}
        </ActionSheet>
    );
};

TransferActions.propTypes = {
    payload: pt.object,
};

export default TransferActions;
