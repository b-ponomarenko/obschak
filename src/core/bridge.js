import bridge from '@vkontakte/vk-bridge';

export const useBridge = (event, cb) => {
    bridge.subscribe((e) => {
        if (e.detail.type === event) {
            return cb(e.detail.data);
        }
    });
};
