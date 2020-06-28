import { bridge } from '../../core/bridge';
import { setNotifications } from '../../reducers/notifications';

export default () => (dispatch) =>
    bridge.send('VKWebAppAllowNotifications').then(() => dispatch(setNotifications({ all: true })));
