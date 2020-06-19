import bridge from '@vkontakte/vk-bridge';
import openModal from './openModal';

export default () => (dispatch) =>
    bridge
        .send('VKWebAppStorageGet', { keys: ['isNotificationShowed'] })
        .then(({ keys: [{ value }] }) => {
            if (value) {
                return;
            }

            dispatch(openModal({ name: 'NOTIFICATION_CARD' }));

            return bridge.send('VKWebAppStorageSet', {
                key: 'isNotificationShowed',
                value: 'true',
            });
        });
