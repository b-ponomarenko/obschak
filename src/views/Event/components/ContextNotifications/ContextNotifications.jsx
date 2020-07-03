import React, { useCallback, useState } from 'react';
import Icon28NotificationDisableOutline from '@vkontakte/icons/dist/28/notification_disable_outline';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import { Subhead } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import disableNotifications from '../../../../actions/vk/disableNotifications';
import openModal from '../../../../actions/openModal';
import styles from './ContextNotifications.module.css';
import openSnackbar from '../../../../actions/openSnackbar';

const ContextNotifications = () => {
    const notifications = useSelector(({ notifications }) => notifications);
    const [notificationEnabled, setNotificationEnabled] = useState(notifications.all);
    const dispatch = useDispatch();
    const handleSuccess = useCallback(() => {
        setNotificationEnabled(true);
        dispatch(openSnackbar({ type: 'info', children: 'Уведомления подключены' }));
    }, []);
    const handleClick = useCallback(() => {
        if (notificationEnabled) {
            setNotificationEnabled(false);
            dispatch(openSnackbar({ type: 'info', children: 'Уведомления отключены' }));
            return dispatch(disableNotifications()).catch(() => setNotificationEnabled(true));
        }

        return dispatch(
            openModal({
                name: 'NOTIFICATION_CARD',
                payload: {
                    onSuccess: handleSuccess,
                },
            })
        );
    }, [notificationEnabled]);

    return (
        <div className={styles.menuItem} onClick={handleClick}>
            {notificationEnabled ? <Icon28Notifications /> : <Icon28NotificationDisableOutline />}
            <Subhead weight="regular">Уведомления</Subhead>
        </div>
    );
};

export default ContextNotifications;
