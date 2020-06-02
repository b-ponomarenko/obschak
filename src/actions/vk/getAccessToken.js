import bridge from '@vkontakte/vk-bridge';

// TODO: выпилить захардкоженный идентификатор
export default (scope) => {
    return bridge.send('VKWebAppGetAuthToken', { app_id: 7473655, scope }).catch(console.log);
};
