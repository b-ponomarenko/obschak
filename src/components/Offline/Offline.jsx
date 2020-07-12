import React from 'react';
import Icon56WifiOutline from '@vkontakte/icons/dist/56/wifi_outline';
import styles from './Offline.module.css';
import { Panel, View, PanelHeader, Placeholder } from '@vkontakte/vkui';

const Offline = () => (
    <View activePanel="offline">
        <Panel id="offline">
            <PanelHeader>Нет сети</PanelHeader>
            <Placeholder
                icon={
                    <div className={styles.fire}>
                        <Icon56WifiOutline />
                    </div>
                }
                header="Нет соединения"
            >
                Для корректной работы приложения Вам необходимо подключится к интернету
            </Placeholder>
        </Panel>
    </View>
);

export default Offline;
