import { bridge } from '../../core/bridge';
import { userLoaded } from '../../reducers/user';

export default () => (dispatch) =>
    bridge.send('VKWebAppGetUserInfo').then((user) => dispatch(userLoaded(user)));
