import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './reducers';
import { registerModal } from './core/modals';
import AddFriendsModal from './modals/AddFriendsModal/AddFriendsModal';
import { registerPopout } from './core/popout';
import BalanceActions from './views/Events/popupts/BalanceActions/BalanceActions';
import { ScreenSpinner } from '@vkontakte/vkui';
import UsersModal from './modals/UsersModal/UsersModal';
import PaymentConfirmation from './views/Events/popupts/PaymentConfirmation/PaymentConfirmation';
import PaymentRequest from './views/Events/popupts/PaymentRequest/PaymentRequest';
import { configureRouter } from './core/router';
import NoFriendsSelected from './views/CreateEvent/popouts/NoFriendsSelected/NoFriendsSelected';
import { vkInfoLoaded } from './reducers/vk';
import { parse } from 'query-string';
import UploadedAvatarActions from './components/UploadedAvatar/UploadedAvatarActions';
console.log('href', window.location.href, window.location.pathname);

// Init VK  Mini App
bridge.send('VKWebAppInit');

registerModal('ADD_FRIENDS_MODAL', AddFriendsModal);
registerModal('USERS_MODAL', UsersModal);

registerPopout('BALANCE_ACTIONS', BalanceActions);
registerPopout('SCREEN_SPINNER', ScreenSpinner);
registerPopout('PAYMENT_CONFIRMATION', PaymentConfirmation);
registerPopout('PAYMENT_CONFIRMATION', PaymentRequest);
registerPopout('NO_FRIENDS_SELECTED', NoFriendsSelected);
registerPopout('UPLOADED_AVATAR_ACTIONS', UploadedAvatarActions);

export const router = configureRouter();

export const store = configureStore(router);

store.dispatch(vkInfoLoaded(parse(window.location.search)));

router.start(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
});
