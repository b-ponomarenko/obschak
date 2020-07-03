import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

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
            { name: 'events', path: '/events' },
            { name: 'create-event', path: '/create-event' },
            {
                name: 'event',
                path: '/events/:eventId',
                children: [
                    { name: 'settings', path: '/settings' },
                    { name: 'purchase', path: '/purchased/:purchaseId' },
                    { name: 'create-purchase', path: '/create-purchase' },
                ],
            },
        ],
        { defaultRoute: 'events' }
    );

    router.usePlugin(browserPlugin());

    return router;
};
