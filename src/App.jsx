import React, { useCallback, useEffect } from 'react';
import { View, ConfigProvider } from '@vkontakte/vkui';
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
import Purchase from './views/Purchase/Purchase';
import Notifications from './views/Notifications/Notifications';
import useBack from './hooks/useBack';
import checkToRedirect from './actions/checkToRedirect';
import offerShare from './modals/actions/offerShare';
import closeSnackbar from './actions/closeSnackbar';

const App = () => {
    const { name } = useSelector(({ router }) => router.route);
    const history = useSelector(({ history }) => history);
    const dispatch = useDispatch();
    const fetchUserInfo = useCallback(() => dispatch(getUserInfo()), []);
    const popouts = getPopouts();
    const popout = useSelector(({ popout }) => popout.popout);
    const PopoutComponent = popouts[popout.name];
    const onSwipeBack = useBack();
    const handleSwipeStart = useCallback(() => dispatch(closeSnackbar()), []);

    useEffect(() => {
        fetchUserInfo();
        dispatch(checkToRedirect());
        dispatch(offerShare());
    }, []);

    return (
        <ConfigProvider isWebView>
            <View
                activePanel={name}
                modal={<ModalRoot />}
                popout={PopoutComponent ? <PopoutComponent payload={popout.payload} /> : undefined}
                history={history.map(({ name }) => name)}
                onSwipeBack={onSwipeBack}
                onSwipeBackStart={handleSwipeStart}
            >
                <Events id="events" />
                <CreateEvent id="create-event" />
                <Event id="event" />
                <EventSettings id="event.settings" />
                <CreatePurchase id="event.create-purchase" />
                <Purchase id="event.purchase" />
                <Notifications id="event.notifications" />
            </View>
        </ConfigProvider>
    );
};

export default App;
