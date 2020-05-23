import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import { Provider } from 'react-redux';
import store from './reducers';
import { registerModal } from './core/modals';
import AddFriendsModal from './modals/AddFriendsModal/AddFriendsModal';
import { registerPopout } from './core/popout';
import BalanceActions from './views/Events/popupts/BalanceActions/BalanceActions';
import { ScreenSpinner } from '@vkontakte/vkui';
import UsersModal from './modals/UsersModal/UsersModal';
import PaymentConfirmation from './views/Events/popupts/PaymentConfirmation/PaymentConfirmation';
import PaymentRequest from './views/Events/popupts/PaymentRequest/PaymentRequest';

// Init VK  Mini App
bridge.send('VKWebAppInit');

registerModal('ADD_FRIENDS_MODAL', AddFriendsModal);
registerModal('USERS_MODAL', UsersModal);
registerPopout('BALANCE_ACTIONS', BalanceActions);
registerPopout('SCREEN_SPINNER', ScreenSpinner);
registerPopout('PAYMENT_CONFIRMATION', PaymentConfirmation);
registerPopout('PAYMENT_CONFIRMATION', PaymentRequest);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
