import bridge from '@vkontakte/vk-bridge';
import { loadFromStorage } from '../../reducers/storage';

export default () => (dispatch) =>
    bridge
        .send('VKWebAppStorageGetKeys', { count: 100, offset: 0 })
        .then(({ keys }) => bridge.send('VKWebAppStorageGet', { keys }))
        .then(({ keys }) => dispatch(loadFromStorage(keys)));
