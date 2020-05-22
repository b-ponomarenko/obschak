import { getColor } from './colors';

const hashFromString = (userName) =>
    userName.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);

export default (username) => getColor(hashFromString(username));
