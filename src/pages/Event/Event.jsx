import React, { FunctionComponent, useState } from 'react';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon20FollowersOutline from '@vkontakte/icons/dist/20/followers_outline';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon16Down from '@vkontakte/icons/dist/16/down';
import { Panel, PanelHeader, Button, CellButton, Cell, PanelHeaderButton, PanelHeaderBack, RichCell, Tabs, Avatar, UsersStack, TabsItem, Group, Div, Text, SimpleCell } from '@vkontakte/vkui';
import styles from './Event.module.css';

const Event = ({ id, onBackClick }) => {
    const [tab, setTab] = useState('purchases');

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={onBackClick} />}
                         right={<PanelHeaderButton><Icon28SettingsOutline /></PanelHeaderButton>}>
                Событие
            </PanelHeader>
            <Group>
                <RichCell
                    multiline
                    disabled
                    before={<Avatar size={72} />}
                >
                    Пикник у Павла
                </RichCell>
            </Group>
            <Group>
                <SimpleCell disabled before={<Icon20FollowersOutline style={{ padding: '0 6px 0 0' }} />}>
                    <div className={styles.info}>
                        <Text>30 участников&nbsp;&bull;&nbsp;28 друзей</Text><UsersStack style={{ padding: '0 0 0 6px' }} size="s" photos={
                        [
                            'https://placeimg.com/72/72/people',
                            'https://placeimg.com/72/72/people',
                            'https://placeimg.com/72/72/people',
                            'https://placeimg.com/72/72/people',
                            'https://placeimg.com/72/72/people',
                        ]
                    } />
                    </div>
                </SimpleCell>
                <SimpleCell disabled before={<Icon20CalendarOutline style={{ padding: '0 6px 0 0' }} />}>
                    <Text>10 апр в 20:00 - 11 апр в 23:00</Text>
                </SimpleCell>
            </Group>
            <Tabs>
                <TabsItem onClick={() => setTab('purchases')} selected={tab === 'purchases'}>Покупки</TabsItem>
                <TabsItem onClick={() => setTab('balance')} selected={tab === 'balance'}>Баланс</TabsItem>
            </Tabs>
            {tab === 'purchases' && (
                <Group>
                    <Div>
                    <Button before={<Icon24Add />} size="xl" mode="secondary">Добавить покупку</Button>

                    </Div>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                    <RichCell
                        before={<Avatar size={48} />}
                        text="Поездка в Лиссабон"
                        caption="Вчера в 20:30"
                        after="+ 1 500 ₽"
                    >
                        Михаил Лихачев
                    </RichCell>
                </Group>
            )}
            {tab === 'balance' && (
                <Group>
                    <RichCell before={
                        <div className={styles.avatarContainer}>
                            <div className={styles.userFrom}>
                                <Avatar size={45} src="https://sun9-22.userapi.com/c638922/v638922920/5bd0a/z4F2vpLqYYE.jpg?ava=1" />
                            </div>
                            <div className={styles.userTo}>
                                <Avatar size={45} src="https://sun9-16.userapi.com/c847216/v847216292/14ad40/DrQnejTNpBk.jpg?ava=1" />
                            </div>
                        </div>
                    }
                                after="+ 1 500 ₽"
                    >
                        <div className={styles.balanceContent}>
                        Александр&nbsp;<div className={styles.icon}><Icon16Down /></div>&nbsp;Константин

                        </div>
                    </RichCell>
                </Group>
            )}
        </Panel>
    );
};

export default Event;
