import React, { useCallback, useEffect, useState } from 'react';
import { View, Root, ConfigProvider } from '@vkontakte/vkui';
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
import checkToRedirect from './actions/checkToRedirect';
import offerShare from './modals/actions/offerShare';
import closeSnackbar from './actions/closeSnackbar';
import getNotifications from './actions/vk/getNotifications';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import getFromStorage from './actions/vk/getFromStorage';
import Offline from './components/Offline/Offline';
import { useBridge } from './core/bridge';

const App = () => {
    const [activeView, setActiveView] = useState('app');
    const [focused, setFocused] = useState(false);
    const { name } = useSelector(({ router }) => router.route);
    const history = useSelector(({ history }) => history);
    const dispatch = useDispatch();
    const fetchUserInfo = useCallback(() => dispatch(getUserInfo()), []);
    const popouts = getPopouts();
    const popout = useSelector(({ popout }) => popout.popout);
    const modal = useSelector(({ modals }) => modals.modal.name);
    const PopoutComponent = popouts[popout.name];
    const onSwipeBack = useCallback(() => {
        dispatch(closeSnackbar());

        return window.history.back();
    }, []);
    const handleSwipeStart = useCallback(() => dispatch(closeSnackbar()), []);

    useBridge('VKWebAppViewRestore', () => {
        if (window.navigator.onLine) {
            setActiveView('app');
        }
    });

    useEffect(() => {
        fetchUserInfo();
        dispatch(checkToRedirect());
        dispatch(offerShare());
        dispatch(getNotifications());
        dispatch(getFromStorage());

        const focusIn = () => setFocused(true);
        const focusOut = () => setFocused(false);
        const handleOnline = () => setActiveView('app');
        const handleOffline = () => setActiveView('offline');

        document.addEventListener('focusin', focusIn);
        document.addEventListener('focusout', focusOut);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            document.removeEventListener('focusin', focusIn);
            document.removeEventListener('focusout', focusOut);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            if (activeView === 'offline') {
                window.history.forward();
            }

            dispatch(closeSnackbar());
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [activeView]);

    return (
        <ConfigProvider isWebView>
            <ErrorBoundary>
                <Root activeView={activeView}>
                    <View
                        id="app"
                        activePanel={name}
                        modal={<ModalRoot />}
                        popout={
                            PopoutComponent ? (
                                <PopoutComponent payload={popout.payload} />
                            ) : undefined
                        }
                        history={modal || popout.name || focused ? [] : history}
                        onSwipeBack={onSwipeBack}
                        onSwipeBackStart={handleSwipeStart}
                    >
                        <Events id="events" />
                        <CreateEvent id="create-event" />
                        <Event id="event" />
                        <EventSettings id="event.settings" />
                        <CreatePurchase id="event.create-purchase" />
                        <Purchase id="event.purchase" />
                    </View>
                    <Offline id="offline" />
                </Root>
            </ErrorBoundary>
        </ConfigProvider>
    );
};

export default App;
