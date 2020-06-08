import { useSelector } from 'react-redux';
import currentUser from '../selectors/currentUser';

export default () => useSelector(currentUser);
