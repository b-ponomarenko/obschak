import bridge from '@vkontakte/vk-bridge';

export default ({ images, index }) => (dispatch) =>
    bridge.send('VKWebAppShowImages', {
        images,
        start_index: index,
    });
