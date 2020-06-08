import React, { useCallback } from 'react';
import pt from 'prop-types';
import { ActionSheet, ActionSheetItem } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closePopout from '../../../../actions/closePopout';
import useCurrentUser from '../../../../hooks/useCurrentUser';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';

const EventSettingsPopout = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);
    const user = useCurrentUser();
    const event = useCurrentEvent();

    const { onSave, onDelete } = payload;

    return (
        <ActionSheet onClose={handleClose}>
            <ActionSheetItem autoclose onClick={onSave}>
                Сохранить изменения
            </ActionSheetItem>
            {user.id === event.creatorId && (
                <ActionSheetItem autoclose mode="destructive" onClick={onDelete}>
                    Удалить событие
                </ActionSheetItem>
            )}
            <ActionSheetItem autoclose mode="cancel">
                Отменить
            </ActionSheetItem>
        </ActionSheet>
    );
};

EventSettingsPopout.propTypes = {
    payload: pt.object,
};

export default EventSettingsPopout;
