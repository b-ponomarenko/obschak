import { connect } from 'react-redux';
import EventsPure from './EventsPure';
import navigateTo from '../../actions/navigateTo';
import getEvents from '../../actions/events/events';
import openPopout from '../../actions/openPopout';
import closePopout from '../../actions/closePopout';

const mapState = ({ events }) => ({ events: events.events });

const mapDispatch = (dispatch) => ({
    navigateToNewEvent: () => dispatch(navigateTo('create-event')),
    fetchEvents: () => dispatch(getEvents()),
    openSpinner: () => dispatch(openPopout({ name: 'SCREEN_SPINNER' })),
    closeSpinner: () => dispatch(closePopout()),
});

export default connect(mapState, mapDispatch)(EventsPure);
