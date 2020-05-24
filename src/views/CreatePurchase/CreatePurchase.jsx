import React, { useCallback } from 'react';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { useCurrentRoute } from '../../core/router';
import { useDispatch } from 'react-redux';
import { actions } from 'redux-router5';

const CreatePurchase = (props) => {
    const { params } = useCurrentRoute();
    const dispatch = useDispatch();
    const { eventId } = params;
    const { navigateTo } = actions;
    const navigateBack = useCallback(() => dispatch(navigateTo('event', { eventId })), []);

    return (
        <Panel id="event.create-purchase">
            <PanelHeader left={<PanelHeaderBack onClick={navigateBack} />}>
                Новая покупка {eventId}
            </PanelHeader>
        </Panel>
    );
};

export default CreatePurchase;
