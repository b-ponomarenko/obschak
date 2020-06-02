import events from '../../../actions/events/events';
import getUsers from '../../../actions/vk/getUsers';
import uniq from '@tinkoff/utils/array/uniq';
import flatten from '@tinkoff/utils/array/flatten';
import map from '@tinkoff/utils/array/map';
import { compose } from 'redux';

export default () => (dispatch) =>
    dispatch(events()).then(({ events }) =>
        dispatch(
            getUsers({
                users: compose(
                    uniq,
                    flatten,
                    map((event) => event.users)
                )(events),
            })
        )
    );
