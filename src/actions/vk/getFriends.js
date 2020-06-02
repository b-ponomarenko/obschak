import getAccessToken from './getAccessToken';
import bridge from '@vkontakte/vk-bridge';

export default (q = '') => (dispatch) =>
    getAccessToken('friends')
        .then(({ access_token }) =>
            bridge.send('VKWebAppCallAPIMethod', {
                method: 'friends.search',
                params: { access_token, v: '5.100', fields: 'photo_100', q, count: 30 },
            })
        )
        .then(({ response }) => response.items);
