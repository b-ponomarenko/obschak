import { bridge } from '../../core/bridge';

export default (text) => (dispatch) => bridge.send('VKWebAppCopyText', { text });
