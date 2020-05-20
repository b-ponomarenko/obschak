import { setCurrentRoute } from '../reducers/router';
import { routes } from '../core/routes';
import { match } from 'path-to-regexp';

const getRoute = (currentRoute) => {
    const index = routes.findIndex(({ id }) => {
        const matchFn = match(id);

        return matchFn(currentRoute);
    });
    const name = routes[index].id;
    const { params = {} } = match(name)(currentRoute);

    return { name, params };
};

export default (currentRoute) => (dispatch) => dispatch(setCurrentRoute(getRoute(currentRoute)));
