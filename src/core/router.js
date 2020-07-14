import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import browserExtension from './browserExtension';

export const useCurrentRoute = () => {
    const route = useSelector(({ router }) => router.route);

    return useMemo(() => route, []);
};

export const withCurrentRoute = (WrappedComponent) => {
    const Wrapper = (props) => {
        const route = useCurrentRoute();

        return <WrappedComponent {...props} route={route} />;
    };

    Wrapper.displayName = `withCurrentRoute(${
        WrappedComponent.displayName || WrappedComponent.name
    })`;

    return Wrapper;
};

export const configureRouter = () => {
    const router = createRouter(
        [
            { name: 'events', path: '/events?modal&popout' },
            { name: 'create-event', path: '/create-event?modal&popout' },
            {
                name: 'event',
                path: '/events/:eventId?modal&popout&popout',
                children: [
                    { name: 'settings', path: '/settings?modal&popout' },
                    { name: 'purchase', path: '/purchased/:purchaseId?modal&popout' },
                    { name: 'create-purchase', path: '/create-purchase?modal&popout' },
                ],
            },
        ],
        { defaultRoute: 'events' }
    );

    router.usePlugin(browserPlugin(undefined, browserExtension));

    return router;
};
