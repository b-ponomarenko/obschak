import bridge from '@vkontakte/vk-bridge';
import { setToStorage } from '../../reducers/storage';

export default ({ key, value }) => (dispatch) =>
    bridge
        .send('VKWebAppStorageSet', { key, value })
        .then(() => dispatch(setToStorage({ key, value })));
