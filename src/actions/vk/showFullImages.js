import { bridge } from '../../core/bridge';

export default ({ images, index }) => (dispatch) =>
    bridge.send('VKWebAppShowImages', {
        images,
        start_index: index,
    });
