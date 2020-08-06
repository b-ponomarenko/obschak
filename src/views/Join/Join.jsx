import React, { useEffect } from 'react';
import DelayedLoader from '../../components/DelayedLoader/DelayedLoader';
import { useCurrentRoute } from '../../core/router';
import { useDispatch } from 'react-redux';
import joinToEvent from '../../actions/events/joinToEvent';
import navigateTo from '../../actions/navigateTo';
import openSnackbar from '../../actions/openSnackbar';
import Panel from '../../components/Panel/Panel';

const noop = () => {};

const Join = () => {
    const { params } = useCurrentRoute();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(joinToEvent(params.join))
            .then(({ id }) => dispatch(navigateTo('event', { eventId: id }, { replace: true })))
            .catch((e) => {
                dispatch(navigateTo('events', {}, { replace: true }));
                dispatch(openSnackbar({ type: 'error', children: e.body?.message }));

                return Promise.reject(e);
            });
    }, []);

    return (
        <Panel id="join">
            <DelayedLoader loading>{noop}</DelayedLoader>
        </Panel>
    );
};

export default Join;
