import { makeEventsRequest } from '../../core/makeRequest';
import { eventLoaded } from '../../reducers/event';
import tap from '@tinkoff/utils/promise/tap';
import getAccessToken from '../vk/getAccessToken';

export default (payload) => (dispatch) => {
    return getAccessToken('friends')
        .then(({ access_token }) =>
            makeEventsRequest({
                method: 'events',
                httpMethod: 'POST',
                payload: {
                    ...payload,
                    accessToken: access_token,
                },
            })
        )
        .then(tap(({ event }) => dispatch(eventLoaded(event))));
};
