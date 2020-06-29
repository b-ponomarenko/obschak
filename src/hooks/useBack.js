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

    return useCallback(() => {
        if (history.length <= 1) {
            return bridge.send('VKWebAppDisableSwipeBack');
        }

        const h = [...history];
        h.pop();
        const { name, params } = last(h);
        dispatch(setHistory(h));
        navigateTo(name, params, { swipeBack: true });
    }, [history]);
};

export const withSwipeBack = (WrappedComponent) => (props) => {
    const onBack = useBack();

    return <WrappedComponent {...props} onBack={onBack} />;
};

export default useBack;
