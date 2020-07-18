import { bridge } from '../../core/bridge';
import { setNotifications } from '../../reducers/notifications';

export default () => (dispatch) =>
    bridge.send('VKWebAppDenyNotifications').then(() => dispatch(setNotifications({ all: false })));
