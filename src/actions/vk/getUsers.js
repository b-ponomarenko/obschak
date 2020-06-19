import bridge from '@vkontakte/vk-bridge';
import { usersLoaded } from '../../reducers/user';

export default ({ users }) => (dispatch) =>
    bridge
        .send('VKWebAppCallAPIMethod', {
            method: 'users.get',
            params: {
                access_token: process.env.REACT_APP_SERVICE_KEY,
                user_ids: users.join(','),
                fields: 'photo_100,screen_name,sex',
                v: '5.100',
            },
        })
        .then(({ response }) => dispatch(usersLoaded(response)));
