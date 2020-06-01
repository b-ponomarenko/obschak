import React, { useCallback, useEffect } from 'react';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useDispatch, useSelector } from 'react-redux';
import ModalRoot from './modals/ModalRoot';
import { getPopouts } from './core/popout';
import Events from './views/Events/Events';
import CreateEvent from './views/CreateEvent/CreateEvent';
import Event from './views/Event/Event';
import EventSettings from './views/EventSettings/EventSettings';
import CreatePurchase from './views/CreatePurchase/CreatePurchase';
import getUserInfo from './actions/vk/getUserInfo';

const App = () => {
    const { name } = useSelector(({ router }) => router.route);
    const dispatch = useDispatch();
    const fetchUserInfo = useCallback(() => dispatch(getUserInfo()), []);
    const popouts = getPopouts();
    const popout = useSelector(({ popout }) => popout.popout);
    const PopoutComponent = popouts[popout.name];

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <View
            activePanel={name}
            modal={<ModalRoot />}
            popout={PopoutComponent ? <PopoutComponent payload={popout.payload} /> : undefined}
        >
            <Events id="events" />
            <CreateEvent id="create-event" />
            <Event id="event" />
            <EventSettings id="event.settings" />
            <CreatePurchase id="event.create-purchase" />
        </View>
    );
};

export default App;
