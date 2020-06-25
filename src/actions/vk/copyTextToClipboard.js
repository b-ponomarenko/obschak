import bridge from '@vkontakte/vk-bridge';

export default (text) => (dispatch) => bridge.send('VKWebAppCopyText', { text });
