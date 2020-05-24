import React, { useCallback } from 'react';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { actions } from 'redux-router5';
import { useCurrentRoute } from '../../core/router';
import { useDispatch } from 'react-redux';

const EventSettings = () => {
    const { params } = useCurrentRoute();
    const dispatch = useDispatch();
    const { eventId } = params;
    const { navigateTo } = actions;
    const navigateBack = useCallback(() => dispatch(navigateTo('event', { eventId })), []);

    return (
        <Panel id="event.settings">
            <PanelHeader left={<PanelHeaderBack onClick={navigateBack} />}>
                Настройки {eventId}
            </PanelHeader>
        </Panel>
    );
};

export default EventSettings;
