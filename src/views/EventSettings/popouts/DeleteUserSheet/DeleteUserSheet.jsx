import React, { useCallback } from 'react';
import pt from 'prop-types';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closePopout from '../../../../actions/closePopout';

const DeleteUserSheet = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const { onDelete } = payload;

    return (
        <ActionSheet onClose={handleClose}>
            <ActionSheetItem mode="destructive" autoclose onClick={onDelete}>
                Исключить пользователя
            </ActionSheetItem>
            <ActionSheetItem autoclose mode="cancel">
                Отменить
            </ActionSheetItem>
        </ActionSheet>
    );
};

DeleteUserSheet.propTypes = {
    payload: pt.object,
};

export default DeleteUserSheet;
