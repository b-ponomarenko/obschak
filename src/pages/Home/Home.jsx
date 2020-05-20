import React from 'react';
import {
    FixedLayout,
    Footer,
    Group,
    Header,
    List,
    Panel,
    PanelHeader,
    Search,
    PanelHeaderButton,
} from '@vkontakte/vkui';
import Icon28WriteSquareOutline from '@vkontakte/icons/dist/28/write_square_outline';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import EventItem from '../../components/EventItem/EventItem';
import styles from './Home.module.css';

const Home = ({ id, onAddEventClick }) => (
    <Panel id={id}>
        <PanelHeader
            right={
                <PanelHeaderButton onClick={onAddEventClick}>
                    <Icon28WriteSquareOutline />
                </PanelHeaderButton>
            }
        >
            События
        </PanelHeader>
        <FixedLayout>
            <div className={styles.search}>
                <Search />
            </div>
        </FixedLayout>
        <div className={styles.list}>
            <List>
                <Group
                    header={
                        <Header mode="secondary">
                            <div className={styles.title}>
                                <Icon16Fire />
                                &nbsp;Текущие события
                            </div>
                        </Header>
                    }
                >
                    <EventItem />
                </Group>
                <Group header={<Header mode="secondary">Будущие события</Header>}>
                    <EventItem />
                    <EventItem />
                    <EventItem />
                    <EventItem />
                    <EventItem />
                </Group>
                <Group header={<Header mode="secondary">Прошедшие события</Header>}>
                    <EventItem />
                    <EventItem />
                    <EventItem />
                    <EventItem />
                    <EventItem />
                    <EventItem />
                </Group>
            </List>
        </div>
        <Footer>123 событие</Footer>
    </Panel>
);

export default Home;
