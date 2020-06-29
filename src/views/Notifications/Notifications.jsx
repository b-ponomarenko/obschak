import React, { useCallback, useState } from 'react';
import { PanelHeader, PanelHeaderBack, Group, Cell, Switch } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import disableNotifications from '../../actions/vk/disableNotifications';
import enableNotifications from '../../actions/vk/enableNotifications';
import useBack from '../../hooks/useBack';
import Panel from '../../components/Panel/Panel';

const Notifications = () => {
    const onBack = useBack();
    const notifications = useSelector(({ notifications }) => notifications);
    const [notificationEnabled, setNotificationEnabled] = useState(notifications.all);
    const dispatch = useDispatch();
    const handleClick = useCallback(() => {
        if (notificationEnabled) {
            setNotificationEnabled(false);
            return dispatch(disableNotifications()).catch(() => setNotificationEnabled(true));
        }

        return dispatch(enableNotifications()).then(() => setNotificationEnabled(true));
    }, [notificationEnabled]);

    return (
        <Panel id="event.notifications">
            <PanelHeader left={<PanelHeaderBack onClick={onBack} />}>Уведомления</PanelHeader>
            <Group>
                <Cell asideContent={<Switch checked={notificationEnabled} onClick={handleClick} />}>
                    Уведомления
                </Cell>
            </Group>
        </Panel>
    );
};

export default Notifications;
