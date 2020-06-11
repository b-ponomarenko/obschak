import { connect } from 'react-redux';
import BalanceListPure from './BalanceListPure';
import compose from '@tinkoff/utils/function/compose';
import { withCurrentRoute } from '../../../../core/router';
import openPopout from '../../../../actions/openPopout';
import currentUser from '../../../../selectors/currentUser';

const mapState = ({ event, user, vk }, { route }) => {
    const { eventId } = route.params;

    return {
        event: event[eventId],
        user,
        currentUser: currentUser({ user, vk }),
    };
};

const mapDispatch = (dispatch) => ({
    showBalanceActions: (payload) => dispatch(openPopout({ name: 'BALANCE_ACTIONS', payload })),
});

export default compose(withCurrentRoute, connect(mapState, mapDispatch))(BalanceListPure);
