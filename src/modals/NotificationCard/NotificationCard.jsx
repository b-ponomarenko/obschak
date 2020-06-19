import React, { useCallback } from 'react';
import Icon56NotificationOutline from '@vkontakte/icons/dist/56/notification_outline';
import { ModalCard } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closeModal from '../../actions/closeModal';
import enableNotifications from '../../actions/vk/enableNotifications';

const NotificationCard = (props) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => {
        dispatch(closeModal());
        dispatch(enableNotifications());
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
                    action: handleClose,
                },
            ]}
        />
    );
};

NotificationCard.propTypes = {};

export default NotificationCard;
