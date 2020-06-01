import { createEvent, createReducer } from '../core/redux';

export const vkInfoLoaded = createEvent('VK_APP_INFO_LOADED');

export default createReducer({}).on(vkInfoLoaded, (_, info) => info);
