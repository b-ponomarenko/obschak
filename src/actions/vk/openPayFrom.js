import bridge from '@vkontakte/vk-bridge';
import { store } from '../../index';

export default ({ value, to, description }) => (dispatch) => {
    const { vk } = store.getState();

    return bridge.send('VKWebAppOpenPayForm', {
        app_id: Number(vk.vk_app_id),
        action: 'pay-to-user',
        params: {
            amount: value,
            user_id: to,
            description,
        },
    });
};
