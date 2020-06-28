import request from '@tinkoff/request-core';
import http from '@tinkoff/request-plugin-protocol-http';
import { store } from '../index';
import * as Sentry from '@sentry/browser';
import { Severity } from '@sentry/types';

const makeRequest = request([http()]);

const makeBaseRequest = ({ url, headers, type = 'json', httpMethod = 'GET', ...rest }) =>
    makeRequest({ url, headers, type, httpMethod, ...rest });

export const makeEventsRequest = ({ method, ...rest }) => {
    const headers = store.getState().vk;
    const url = `${process.env.REACT_APP_EVENTS_API}/${method}`;

    return makeBaseRequest({
        url,
        headers,
        ...rest,
    }).catch((e) => {
        Sentry.captureException(e, {
            level: Severity.Error,
            contexts: {
                errorType: 'api',
                apiType: 'events',
            },
            extra: {
                apiUrl: url,
                apiHeaders: headers,
            },
        });
        return Promise.reject(e);
    });
};

export default makeBaseRequest;
