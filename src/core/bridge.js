import vkBridge from '@vkontakte/vk-bridge';
import * as Sentry from '@sentry/browser';
import { Severity } from '@sentry/types';

export const useBridge = (event, cb) => {
    vkBridge.subscribe((e) => {
        if (e.detail.type === event) {
            return cb(e.detail.data);
        }
    });
};

export const bridge = {
    send: (...args) =>
        vkBridge.send(...args).catch((e) => {
            Sentry.captureException(e, {
                level: Severity.Error,
                contexts: {
                    errorType: 'api',
                    apiType: 'bridge',
                },
                extra: args,
            });
            return Promise.reject(e);
        }),
};
