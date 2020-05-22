import Events from '../views/Events/Events';
import CreateEvent from '../views/CreateEvent/CreateEvent';
import Event from '../views/Event/Event';

export const routes = [
    { id: 'events', component: Events },
    { id: 'create-event', component: CreateEvent },
    { id: 'events/:eventId', component: Event },
];
