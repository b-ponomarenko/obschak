export const createReducer = (initialState) => {
    const reducerHash = {};
    const reducer = (state = initialState, action) => {
        const callback = reducerHash[action.type];

        if (!callback) {
            return state;
        }

        return callback(state, action.payload);
    };

    reducer.on = (event, callback) => {
        reducerHash[event.type] = callback;

        return reducer;
    };

    return reducer;
};

export const createEvent = (eventName) => {
    const eventInstance = (payload) => ({ type: eventName, payload });

    eventInstance.type = eventName;

    return eventInstance;
};
