import request from '@tinkoff/request-core';
import http from '@tinkoff/request-plugin-protocol-http';
import { store } from '../index';

const makeRequest = request([http()]);

const makeBaseRequest = ({ url, headers, type = 'json', httpMethod = 'GET', ...rest }) =>
    makeRequest({ url, headers, type, httpMethod, ...rest });

export const makeEventsRequest = ({ method, ...rest }) => {
    const headers = store.getState().vk;

    return makeBaseRequest({
        url: `${process.env.REACT_APP_EVENTS_API}/${method}`,
        headers,
        ...rest,
    });
};

export default makeBaseRequest;
