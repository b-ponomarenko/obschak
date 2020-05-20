const popouts = {};

export const registerPopout = (name, component) => (popouts[name] = component);

export const getPopouts = () => popouts;
