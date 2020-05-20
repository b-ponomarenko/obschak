import React, { useState } from 'react';
import {
    View,
    ScreenSpinner,
    Epic,
    Tabbar,
    TabbarItem,
    Panel,
    ActionSheet,
    ActionSheetItem,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from './pages/Home/Home';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import ModalRoot from './modals/ModalRoot';
import Event from './pages/Event/Event';

const App = () => {
    const [activePanel, setActivePanel] = useState('event');
    const [activeModal, setActiveModal] = useState();
    const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

    return (
        <View
            id="app"
            activePanel={activePanel}
            modal={<ModalRoot activeModal={activeModal} />}
            popout={
                false && (
                    <ActionSheet>
                        <ActionSheetItem>Запросить платеж</ActionSheetItem>
                        <ActionSheetItem>Отметить как завершенное</ActionSheetItem>
                        <ActionSheetItem autoclose mode="cancel">
                            Отменить
                        </ActionSheetItem>
                    </ActionSheet>
                )
            }
        >
            <Home id="home" onAddEventClick={() => setActivePanel('create-event')} />
            <CreateEvent
                id="create-event"
                onBackClick={() => setActivePanel('home')}
                onModalOpen={() => setActiveModal('friends')}
            />
            <Event id="event" onBackClick={() => setActivePanel('home')} />
        </View>
    );
};

export default App;
