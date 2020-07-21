import 'core-js/features/map';
import 'core-js/features/set';
import 'intersection-observer';
import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './reducers';
import { registerModal } from './core/modals';
import AddFriendsModal from './modals/AddFriendsModal/AddFriendsModal';
import { registerPopout } from './core/popout';
import BalanceActions from './views/Event/popupts/BalanceActions/BalanceActions';
import { ScreenSpinner } from '@vkontakte/vkui';
import UsersModal from './modals/UsersModal/UsersModal';
import PaymentConfirmation from './views/Event/popupts/PaymentConfirmation/PaymentConfirmation';
import { configureRouter } from './core/router';
import { vkInfoLoaded } from './reducers/vk';
import { parse } from 'query-string';
import UploadedAvatarActions from './components/UploadedAvatar/UploadedAvatarActions';
import NotificationPopout from './popouts/NotificationPopout/NotificationPopout';
import LeaveEventConfirmation from './views/EventSettings/popouts/LeaveEventConfirmation/LeaveEventConfirmation';
import DeleteEventConfirmation from './views/EventSettings/popouts/DeleteEventConfirmation/DeleteEventConfirmation';
import DeletePurchaseConfirmation from './views/CreatePurchase/popouts/DeletePurchaseConfirmation/DeletePurchaseConfirmation';
import TransferActions from './views/Event/popupts/TransferActions/TransferActions';
import CancelTransferConfirmation from './views/Event/popupts/CancelTransferConfirmation/CancelTransferConfirmation';
import SuccessTransfer from './views/Event/modals/SuccessTransfer/SuccessTransfer';
import NotificationCard from './views/Event/modals/NotificationCard/NotificationCard';
import ShareOfferCard from './modals/ShareOfferCard/ShareOfferCard';
import './index.css';
import DeleteUserSheet from './views/EventSettings/popouts/DeleteUserSheet/DeleteUserSheet';
import * as Sentry from '@sentry/browser';
import packageJson from '../package.json';

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    enabled: process.env.NODE_ENV === 'production',
    environment: process.env.NODE_ENV,
    release: packageJson.version,
});
// Init VK  Mini App
bridge.send('VKWebAppInit');

// Подписываемся на изменение темы приложения
bridge.subscribe((e) => {
    if (e.detail.type === 'VKWebAppUpdateConfig') {
        document.body.setAttribute('scheme', e.detail.data.scheme);
    }
});

registerModal('ADD_FRIENDS_MODAL', AddFriendsModal);
registerModal('USERS_MODAL', UsersModal);
registerModal('SUCCESS_TRANSFER', SuccessTransfer);
registerModal('NOTIFICATION_CARD', NotificationCard);
registerModal('SHARE_OFFER_CARD', ShareOfferCard);

registerPopout('BALANCE_ACTIONS', BalanceActions);
registerPopout('SCREEN_SPINNER', ScreenSpinner);
registerPopout('PAYMENT_CONFIRMATION', PaymentConfirmation);
registerPopout('UPLOADED_AVATAR_ACTIONS', UploadedAvatarActions);
registerPopout('NOTIFICATION_POPOUT', NotificationPopout);
registerPopout('LEAVE_EVENT_CONFIRMATION', LeaveEventConfirmation);
registerPopout('DELETE_EVENT_CONFIRMATION', DeleteEventConfirmation);
registerPopout('DELETE_PURCHASE_CONFIRMATION', DeletePurchaseConfirmation);
registerPopout('TRANSFER_ACTIONS', TransferActions);
registerPopout('CANCEL_TRANSFER_CONFIRMATION', CancelTransferConfirmation);
registerPopout('DELETE_USER_SHEET', DeleteUserSheet);

export const router = configureRouter();
export const store = configureStore(router);

store.dispatch(vkInfoLoaded(parse(window.location.search)));

if (process.env.NODE_ENV !== 'production') {
    window.store = store;
}

router.start(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
});

if (process.env.NODE_ENV === 'development') {
    import('./eruda').then(({ default: eruda }) => {}); //runtime download
}
