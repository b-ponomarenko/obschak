import bridge from '@vkontakte/vk-bridge';
import { setNotifications } from '../../reducers/notifications';

export default () => (dispatch) =>
    bridge.send('VKWebAppAllowNotifications').then(() => dispatch(setNotifications({ all: true })));
