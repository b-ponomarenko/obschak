import React, { useCallback } from 'react';
import pt from 'prop-types';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';
import { ModalCard } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closeModal from '../../../../actions/closeModal';
import enableNotifications from '../../../../actions/vk/enableNotifications';

const NotificationCard = ({ payload }) => {
    const { onSuccess } = payload;
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        dispatch(closeModal());
    }, []);
    const handleEnableNotifications = useCallback(() => {
        handleClose();
        dispatch(enableNotifications()).then(onSuccess);
    }, []);

    return (
        <ModalCard
            icon={<Icon56NotificationOutline />}
            id="NOTIFICATION_CARD"
            onClose={handleClose}
            header="Разрешите отправлять Вам уведомления"
            caption="Вы сможете получать уведомления о переводах, а также напоминания о необходимости совершить перевод вашему другу"
            actions={[
                {
                    title: 'Разрешить',
                    mode: 'primary',
                    action: handleEnableNotifications,
                },
            ]}
        />
    );
};

NotificationCard.propTypes = {
    payload: pt.object,
};

export default NotificationCard;
