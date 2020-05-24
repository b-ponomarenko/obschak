import React from 'react';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useSelector } from 'react-redux';
import ModalRoot from './modals/ModalRoot';
import { getPopouts } from './core/popout';
import Events from './views/Events/Events';
import CreateEvent from './views/CreateEvent/CreateEvent';
import Event from './views/Event/Event';
import EventSettings from './views/EventSettings/EventSettings';
import CreatePurchase from './views/CreatePurchase/CreatePurchase';

const App = () => {
    const { name } = useSelector(({ router }) => router.route);
    const popouts = getPopouts();
    const popout = useSelector(({ popout }) => popout.popout);
    const PopoutComponent = popouts[popout.name];

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
