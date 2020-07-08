import React, { useCallback, useState } from 'react';
import Icon28NotificationDisableOutline from '@vkontakte/icons/dist/28/notification_disable_outline';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import { Subhead } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import disableNotifications from '../../../../actions/vk/disableNotifications';
import openModal from '../../../../actions/openModal';
import styles from './ContextNotifications.module.css';
import openSnackbar from '../../../../actions/openSnackbar';
import { useBridge } from '../../../../core/bridge';
import enableNotifications from '../../../../actions/vk/enableNotifications';
import setToStorage from '../../../../actions/vk/setToStorage';

const ContextNotifications = () => {
    const notifications = useSelector(({ notifications }) => notifications);
    const [notificationEnabled, setNotificationEnabled] = useState(notifications.all);
    const isNotificationShowed = useSelector(
        ({ storage }) => storage.isNotificationShowed === 'true'
    );
    const dispatch = useDispatch();
    const handleSuccess = useCallback(() => {
        setNotificationEnabled(true);
        dispatch(setToStorage({ key: 'isNotificationShowed', value: 'true' }));
        dispatch(openSnackbar({ type: 'info', children: 'Уведомления подключены' }));
    }, []);
    const handleClick = useCallback(() => {
        if (notificationEnabled) {
            setNotificationEnabled(false);
            dispatch(openSnackbar({ type: 'info', children: 'Уведомления отключены' }));
            return dispatch(disableNotifications()).catch(() => setNotificationEnabled(true));
        }

        if (isNotificationShowed) {
            return dispatch(enableNotifications()).then(handleSuccess);
        }

        return dispatch(
            openModal({
                name: 'NOTIFICATION_CARD',
                payload: {
                    onSuccess: handleSuccess,
                },
            })
        );
    }, [notificationEnabled, isNotificationShowed]);

    useBridge('VKWebAppAllowNotificationsResult', () => {
        setNotificationEnabled(true);
    });
    useBridge('VKWebAppDenyNotificationsResult', () => {
        setNotificationEnabled(false);
    });

    return (
        <div className={styles.menuItem} onClick={handleClick}>
            {notificationEnabled ? <Icon28Notifications /> : <Icon28NotificationDisableOutline />}
            <Subhead weight="regular">Уведомления</Subhead>
        </div>
    );
};

export default ContextNotifications;
