const modals = [];

export const registerModal = (name, component) => modals.push({ name, component });

export const getModals = () => modals;
