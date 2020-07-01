import React from 'react';
import useNavigate from './useNavigate';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import last from '@tinkoff/utils/array/last';
import { setHistory } from '../reducers/history';
import bridge from '@vkontakte/vk-bridge';

const useBack = () => {
    const history = useSelector(({ history }) => history);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    return useCallback(
        (routeName, routeParams) => {
            const h = [...history];
            h.pop();
            const { name, params } = last(h);

            if (h.length <= 1) {
                bridge.send('VKWebAppDisableSwipeBack');
            }

            dispatch(setHistory(h));

            if (typeof routeName === 'string') {
                return navigateTo(routeName, routeParams);
            }

            return navigateTo(name, params, { swipeBack: true });
        },
        [history]
    );
};

export const withSwipeBack = (WrappedComponent) => (props) => {
    const onBack = useBack();

    return (
        <WrappedComponent
            {...props}
            onBack={(routeName, routeParams) => onBack(routeName, routeParams)}
        />
    );
};

export default useBack;
