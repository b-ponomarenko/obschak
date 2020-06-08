import { useCurrentRoute } from '../core/router';
import { useSelector } from 'react-redux';

export default () => {
    const { params } = useCurrentRoute();

    return useSelector(({ event }) => event[params.eventId]);
};
