import { connect } from 'react-redux';
import EventsPure from './EventsPure';
import navigateTo from '../../actions/navigateTo';
import fetchEvents from './actions/fetchEvents';

const mapState = ({ events }) => ({ events: events.events });

const mapDispatch = (dispatch) => ({
    navigateToNewEvent: () => dispatch(navigateTo('create-event')),
    fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapState, mapDispatch)(EventsPure);
