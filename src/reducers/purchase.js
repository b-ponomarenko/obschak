import { createEvent, createReducer } from '../core/redux';

export const purchaseLoaded = createEvent('PURCHASE_LOADED');

export default createReducer({}).on(purchaseLoaded, (state, purchase) => ({
    ...state,
    [purchase.id]: purchase,
}));
