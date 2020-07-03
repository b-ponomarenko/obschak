import React, { useCallback } from 'react';
import pt from 'prop-types';
import { useDispatch } from 'react-redux';
import closePopout from '../../actions/closePopout';
import { ActionSheetItem, ActionSheet, usePlatform, IOS } from '@vkontakte/vkui';

const UploadedAvatarActions = ({ payload }) => {
    const platform = usePlatform();
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const handleLoadImage = useCallback(() => {
        handleClose();
        onChange();
    }, []);
    const { onDelete, onChange } = payload;

    return (
        <ActionSheet onClose={handleClose}>
            <ActionSheetItem onClick={handleLoadImage}>Загрузить c устройства</ActionSheetItem>
            <ActionSheetItem autoclose mode="destructive" onClick={onDelete}>
                Удалить фото
            </ActionSheetItem>
            {platform === IOS && (
                <ActionSheetItem autoclose mode="cancel">
                    Отменить
                </ActionSheetItem>
            )}
        </ActionSheet>
    );
};

UploadedAvatarActions.propTypes = {
    payload: pt.shape({
        onDelete: pt.func,
        onChange: pt.func,
    }),
};

export default UploadedAvatarActions;
