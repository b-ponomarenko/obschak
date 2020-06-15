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
import BalanceActions from './views/Event/popupts/BalanceActions/BalanceActions';
import { ScreenSpinner } from '@vkontakte/vkui';
import UsersModal from './modals/UsersModal/UsersModal';
import PaymentConfirmation from './views/Event/popupts/PaymentConfirmation/PaymentConfirmation';
import PaymentRequest from './views/Event/popupts/PaymentRequest/PaymentRequest';
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

// Init VK  Mini App
bridge.send('VKWebAppInit');

registerModal('ADD_FRIENDS_MODAL', AddFriendsModal);
registerModal('USERS_MODAL', UsersModal);

registerPopout('BALANCE_ACTIONS', BalanceActions);
registerPopout('SCREEN_SPINNER', ScreenSpinner);
registerPopout('PAYMENT_CONFIRMATION', PaymentConfirmation);
registerPopout('PAYMENT_REQUEST', PaymentRequest);
registerPopout('UPLOADED_AVATAR_ACTIONS', UploadedAvatarActions);
registerPopout('NOTIFICATION_POPOUT', NotificationPopout);
registerPopout('LEAVE_EVENT_CONFIRMATION', LeaveEventConfirmation);
registerPopout('DELETE_EVENT_CONFIRMATION', DeleteEventConfirmation);
registerPopout('DELETE_PURCHASE_CONFIRMATION', DeletePurchaseConfirmation);
registerPopout('TRANSFER_ACTIONS', TransferActions);
registerPopout('CANCEL_TRANSFER_CONFIRMATION', CancelTransferConfirmation);

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
