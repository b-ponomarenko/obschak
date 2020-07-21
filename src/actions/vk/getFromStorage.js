import { bridge } from '../../core/bridge';
import { loadFromStorage } from '../../reducers/storage';
import isEmpty from '@tinkoff/utils/is/empty';

export default () => (dispatch) =>
    bridge
        .send('VKWebAppStorageGetKeys', { count: 100, offset: 0 })
        .then(({ keys }) => {
            if (isEmpty(keys)) {
                return { keys: [] };
            }

            return bridge.send('VKWebAppStorageGet', { keys });
        })
        .then(({ keys }) => dispatch(loadFromStorage(keys)));
