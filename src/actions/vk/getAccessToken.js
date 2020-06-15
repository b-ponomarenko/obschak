import bridge from '@vkontakte/vk-bridge';
import { store } from '../../index';

export default (scope) => {
    const { vk } = store.getState();

    return bridge.send('VKWebAppGetAuthToken', { app_id: Number(vk.vk_app_id), scope });
};
