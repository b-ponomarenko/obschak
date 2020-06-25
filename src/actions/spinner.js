import openPopout from './openPopout';
import closePopout from './closePopout';

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

let isCanceled = false;

export const showSpinner = () => (dispatch) => {
    isCanceled = false;

    return wait(500).then(() => {
        if (!isCanceled) {
            dispatch(openPopout({ name: 'SCREEN_SPINNER' }));
        }
    });
};

export const hideSpinner = () => (dispatch) => {
    isCanceled = true;

    return dispatch(closePopout());
};
