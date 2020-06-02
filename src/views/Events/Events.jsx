import { connect } from 'react-redux';
import EventsPure from './EventsPure';
import navigateTo from '../../actions/navigateTo';
import openPopout from '../../actions/openPopout';
import closePopout from '../../actions/closePopout';
import fetchEvents from './actions/fetchEvents';

const mapState = ({ events }) => ({ events: events.events });

const mapDispatch = (dispatch) => ({
    navigateToNewEvent: () => dispatch(navigateTo('create-event')),
    fetchEvents: () => dispatch(fetchEvents()),
    openSpinner: () => dispatch(openPopout({ name: 'SCREEN_SPINNER' })),
    closeSpinner: () => dispatch(closePopout()),
});

export default connect(mapState, mapDispatch)(EventsPure);
