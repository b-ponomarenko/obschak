import { setHistory } from '../reducers/history';
import bridge from '@vkontakte/vk-bridge';

export default (store) => () => ({
    onStart() {},
    onStop() {},
    onTransitionStart() {},
    onTransitionCancel() {},
    onTransitionError() {},
    onTransitionSuccess(toState, fromState, { swipeBack }) {
        const historyState = store.getState().history;

        if (swipeBack) {
            return;
        }

        const history = [...historyState, toState];

        if (history.length > 1) {
            bridge.send('VKWebAppEnableSwipeBack');
        }

        store.dispatch(setHistory(history));
    },
    teardown() {},
});
