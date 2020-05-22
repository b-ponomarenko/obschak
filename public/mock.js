const users = require('./users.json');
const events = require('./events.json');

module.exports = () => ({
    users,
    events: events.map((event) => ({
        ...event,
        users: event.users.map(({ id }) => users.find((user) => user.id === id)),
    })),
});
