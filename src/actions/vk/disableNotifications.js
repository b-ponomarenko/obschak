import bridge from '@vkontakte/vk-bridge';
import { setNotifications } from '../../reducers/notifications';

export default () => (dispatch) =>
    bridge.send('VKWebAppDenyNotifications').then(() => dispatch(setNotifications({ all: false })));
