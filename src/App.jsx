import React from 'react';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useSelector } from 'react-redux';
import { routes } from './core/routes';
import ModalRoot from './modals/ModalRoot';
import { getPopouts } from './core/popout';

const App = () => {
    const { name } = useSelector(({ router }) => router.currentRoute);
    const popouts = getPopouts();
    const popout = useSelector(({ popout }) => popout.popout);
    const PopoutComponent = popouts[popout.name];

    return (
        <View
            activePanel={name}
            modal={<ModalRoot />}
            popout={PopoutComponent ? <PopoutComponent payload={popout.payload} /> : undefined}
        >
            {routes.map(({ id, component: Component }) => (
                <Component key={id} id={id} />
            ))}
        </View>
    );
};

export default App;
