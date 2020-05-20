import Home from '../views/Home/Home';
import CreateEvent from '../views/CreateEvent/CreateEvent';
import Event from '../views/Event/Event';

export const routes = [
    { id: 'index', component: Home },
    { id: 'create-event', component: CreateEvent },
    { id: 'event/:eventId', component: Event },
];
