import { connect } from 'react-redux';
import EventPure from './EventPure';
import navigateTo from '../../actions/navigateTo';
import openModal from '../../actions/openModal';
import closeModal from '../../actions/closeModal';
import compose from '@tinkoff/utils/function/compose';
import { withCurrentRoute } from '../../core/router';
import fetchEventWithUsers from '../../actions/fetchEventWithUsers';
import openSnackbar from '../../actions/openSnackbar';
import copyTextToClipboard from '../../actions/vk/copyTextToClipboard';
import { withPlatform } from '@vkontakte/vkui';

const mapState = ({ event, user, vk }, { route }) => {
    const { params } = route;

    return {
        user,
        eventId: params.eventId,
        event: event[params.eventId],
        appId: vk.vk_app_id,
    };
};

const mapDispatch = (dispatch) => ({
    fetchEvent: (id) => dispatch(fetchEventWithUsers(id)),
    navigateTo: (routeName, routeParams) => dispatch(navigateTo(routeName, routeParams)),
    showEventMembers: (payload) =>
        dispatch(
            openModal({
                name: 'USERS_MODAL',
                payload: { ...payload, onClose: () => dispatch(closeModal()) },
            })
        ),
    openSnackbar: (payload) => dispatch(openSnackbar(payload)),
    copyTextToClipboard: (text) => dispatch(copyTextToClipboard(text)),
});

export default compose(withPlatform, withCurrentRoute, connect(mapState, mapDispatch))(EventPure);
