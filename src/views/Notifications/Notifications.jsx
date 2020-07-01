import React, { useCallback, useState } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Group, Cell, Switch } from '@vkontakte/vkui';
import useCurrentEvent from '../../hooks/useCurrentEvent';
import { useDispatch, useSelector } from 'react-redux';
import navigateTo from '../../actions/navigateTo';
import disableNotifications from '../../actions/vk/disableNotifications';
import enableNotifications from '../../actions/vk/enableNotifications';

const Notifications = () => {
    const event = useCurrentEvent();
    const notifications = useSelector(({ notifications }) => notifications);
    const [notificationEnabled, setNotificationEnabled] = useState(notifications.all);
    const dispatch = useDispatch();
    const navigateBack = useCallback(() => dispatch(navigateTo('event', { eventId: event.id })), [
        event,
    ]);
    const handleClick = useCallback(() => {
        if (notificationEnabled) {
            setNotificationEnabled(false);
            return dispatch(disableNotifications()).catch(() => setNotificationEnabled(true));
        }

        return dispatch(enableNotifications()).then(() => setNotificationEnabled(true));
    }, [notificationEnabled]);

    return (
        <Panel id="event.notifications">
            <PanelHeader left={<PanelHeaderBack onClick={navigateBack} />}>Уведомления</PanelHeader>
            <Group>
                <Cell asideContent={<Switch checked={notificationEnabled} onClick={handleClick} />}>
                    Уведомления
                </Cell>
            </Group>
        </Panel>
    );
};

export default Notifications;
