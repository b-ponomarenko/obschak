import React, { useCallback } from 'react';
import {
    Panel,
    PanelHeaderBack,
    PanelHeader,
    RichCell,
    Input,
    Avatar,
    Group,
    Header,
    Switch,
    Cell,
    FormLayout,
    FormLayoutGroup,
    FixedLayout,
    Button,
    SimpleCell,
} from '@vkontakte/vkui';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import styles from './CreateEvent.module.css';
import { useDispatch } from 'react-redux';
import navigateTo from '../../actions/navigateTo';
import openModal from '../../actions/openModal';

const CreateEvent = ({ id }) => {
    const dispatch = useDispatch();
    const navigateBack = useCallback(() => dispatch(navigateTo('index')), []);
    const openFriendsModal = useCallback(
        () => dispatch(openModal({ name: 'ADD_FRIENDS_MODAL' })),
        []
    );

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={navigateBack} />}>
                Новое событие
            </PanelHeader>
            <div className={styles.container}>
                <RichCell
                    multiline
                    disabled
                    before={
                        <div className={styles.imagePlaceholder}>
                            <Icon28CameraOutline />
                        </div>
                    }
                    caption={
                        <div className={styles.caption}>
                            Введите название и при желании загрузите фотографию
                        </div>
                    }
                >
                    <Input placeholder="Название события" />
                </RichCell>
                <Cell asideContent={<Switch />}>Создать беседу</Cell>
                <FormLayout>
                    <FormLayoutGroup top="Время начала">
                        <Input type="datetime-local" />
                    </FormLayoutGroup>
                    <FormLayoutGroup top="Время окончания">
                        <Input type="datetime-local" />
                    </FormLayoutGroup>
                    <FormLayoutGroup>
                        <Button
                            align="center"
                            size="xl"
                            mode="secondary"
                            onClick={openFriendsModal}
                        >
                            Добавить друзей
                        </Button>
                    </FormLayoutGroup>
                </FormLayout>
                <Group>
                    <Header mode="secondary">Участники</Header>
                    <SimpleCell before={<Avatar size={40} />}>Игорь Фёдоров</SimpleCell>
                    <SimpleCell before={<Avatar size={40} />}>Artur Stambultsian</SimpleCell>
                </Group>
            </div>
            <FixedLayout vertical="bottom">
                <div className={styles.createButton}>
                    <Button align="center" size="xl">
                        Создать событие
                    </Button>
                </div>
            </FixedLayout>
        </Panel>
    );
};

export default CreateEvent;
