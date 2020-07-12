import throttle from '@tinkoff/utils/function/throttle';

const getBase = () => window.location.pathname;

const supportsPopStateOnHashChange = () => window.navigator.userAgent.indexOf('Trident') === -1;

const pushState = (state, title, path) => window.history.pushState(state, title, path);

const replaceState = (state, title, path) => window.history.replaceState(state, title, path);

const addPopstateListener = (fn, opts) => {
    const shouldAddHashChangeListener = opts.useHash && !supportsPopStateOnHashChange();
    const popStateThrottledFn = throttle(1000, fn);

    window.addEventListener('popstate', popStateThrottledFn);

    if (shouldAddHashChangeListener) {
        window.addEventListener('hashchange', popStateThrottledFn);
    }

    return () => {
        window.removeEventListener('popstate', popStateThrottledFn);

        if (shouldAddHashChangeListener) {
            window.removeEventListener('hashchange', popStateThrottledFn);
        }
    };
};

const getLocation = (opts) => {
    const path = opts.useHash
        ? window.location.hash.replace(new RegExp('^#' + opts.hashPrefix), '')
        : window.location.pathname.replace(new RegExp('^' + opts.base), '');

    // Fix issue with browsers that don't URL encode characters (Edge)
    const correctedPath = safelyEncodePath(path);

    return (correctedPath || '/') + window.location.search;
};

const safelyEncodePath = (path) => {
    try {
        return encodeURI(decodeURI(path));
    } catch (_) {
        return path;
    }
};

const getState = () => window.history.state;

const getHash = () => window.location.hash;

export default {
    getBase,
    pushState,
    replaceState,
    addPopstateListener,
    getLocation,
    getState,
    getHash,
};
