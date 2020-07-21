import React, { PureComponent } from 'react';
import cx from 'classnames';
import Icon20FollowersOutline from '@vkontakte/icons/dist/20/followers_outline';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon28ShareExternalOutline from '@vkontakte/icons/dist/28/share_external_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import {
    PanelHeader,
    PanelHeaderBack,
    RichCell,
    Tabs,
    UsersStack,
    TabsItem,
    Group,
    Div,
    Text,
    SimpleCell,
    PullToRefresh,
    Header,
    Footer,
    Subhead,
    TabbarItem,
    IOS,
} from '@vkontakte/vkui';
import styles from './Event.module.css';
import { plural } from '../../plural';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import pt from 'prop-types';
import Avatar from '../../components/Avatar/Avatar';
import BalanceList from './components/BalanceList/BalanceList';
import TransferList from './components/TransferList/TransferList';
import isEmpty from '@tinkoff/utils/is/empty';
import PurchaseList from './components/PurchaseList/PurchaseList';
import Panel from '../../components/Panel/Panel';
import DelayedLoader from '../../components/DelayedLoader/DelayedLoader';
import { encodeBase64 } from '../../utils/base64';
import { getImage } from '../../utils/image';
import ContextNotifications from './components/ContextNotifications/ContextNotifications';
import { bridge } from '../../core/bridge';

export default class EventPure extends PureComponent {
    state = {
        tab: 'purchases',
    };

    static propTypes = {
        platform: pt.string,
        user: pt.object,
        event: pt.shape({
            id: pt.number,
            title: pt.string,
            photo: pt.string,
            startDate: pt.string,
            endDate: pt.string,
            users: pt.array,
            purchases: pt.array,
            transfers: pt.array,
        }),
        navigateTo: pt.func,
        showEventMembers: pt.func,
        fetchEvent: pt.func,
        eventId: pt.string,
        appId: pt.string,
        route: pt.object,
        openSnackbar: pt.func,
        copyTextToClipboard: pt.func,
        id: pt.string,
    };

    componentDidMount() {
        const { fetchEvent, openSnackbar, eventId } = this.props;

        fetchEvent(eventId).catch(() => {
            this.handleBackClick();
            openSnackbar({ type: 'error', children: 'Вы не являетесь участником события.' });
        });
    }

    handlePurchasesTabClick = () => this.setState({ tab: 'purchases' });
    handleBalanceTabClick = () => this.setState({ tab: 'balance' });
    handleMembersClick = () => {
        const { showEventMembers, event } = this.props;

        showEventMembers({ title: 'Участники', users: event.users, showCreator: true });
    };

    navigateToSettings = () => {
        const { eventId, navigateTo } = this.props;

        navigateTo('event.settings', { eventId });
    };

    handleRefreshEvent = () => {
        const { fetchEvent, eventId } = this.props;

        this.setState({ isFetching: true });
        fetchEvent(eventId).finally(() => this.setState({ isFetching: false }));
    };

    handleShareClick = () => {
        const { openSnackbar, copyTextToClipboard, appId, event } = this.props;

        return copyTextToClipboard(
            `https://vk.com/app${appId}#${encodeBase64(
                JSON.stringify({ route: 'event', params: { eventId: event.id } })
            )}`
        ).then(() => openSnackbar({ type: 'info', children: 'Ссылка на событие скопирована' }));
    };

    handleBackClick = () => window.history.back();

    handleOpenFullPhoto = () => {
        const { photo } = this.props.event;

        if (!photo) {
            return;
        }

        bridge.send('VKWebAppShowImages', {
            images: [getImage(photo, 'l')],
            start_index: 0,
        });
    };

    render() {
        const { event, user, platform } = this.props;
        const { isFetching } = this.state;

        return (
            <Panel id="event" previousView="events">
                <PanelHeader left={<PanelHeaderBack onClick={this.handleBackClick} />}>
                    Событие
                </PanelHeader>
                <DelayedLoader loading={!event}>
                    {() => {
                        const { title, users, startDate, endDate, photo, purchases } = event;
                        const { tab } = this.state;

                        return (
                            <PullToRefresh
                                onRefresh={this.handleRefreshEvent}
                                isFetching={isFetching}
                            >
                                <Group>
                                    <RichCell
                                        multiline
                                        disabled
                                        before={
                                            <div className={styles.avatar}>
                                                <Avatar
                                                    src={getImage(photo, 'xs')}
                                                    letter={title}
                                                    size={72}
                                                    onClick={this.handleOpenFullPhoto}
                                                />
                                            </div>
                                        }
                                    >
                                        {title}
                                    </RichCell>
                                </Group>
                                <Group>
                                    <SimpleCell
                                        disabled
                                        before={
                                            <div className={styles.inactive}>
                                                <Icon20FollowersOutline
                                                    style={{ padding: '0 6px 0 0' }}
                                                />
                                            </div>
                                        }
                                    >
                                        <div
                                            className={cx(styles.info, styles.inactive)}
                                            onClick={this.handleMembersClick}
                                        >
                                            <Text>
                                                {users.length}{' '}
                                                {plural(users.length, [
                                                    'участник',
                                                    'участника',
                                                    'участников',
                                                ])}
                                            </Text>
                                            <UsersStack
                                                style={{ padding: '0 0 0 6px' }}
                                                size="s"
                                                photos={users.map(
                                                    (userId) => user[userId]?.photo_100
                                                )}
                                            />
                                        </div>
                                    </SimpleCell>
                                    <SimpleCell
                                        disabled
                                        before={
                                            <div className={styles.inactive}>
                                                <Icon20CalendarOutline
                                                    style={{ padding: '0 6px 0 0' }}
                                                />
                                            </div>
                                        }
                                    >
                                        <div className={styles.inactive}>
                                            <Text>
                                                {format(new Date(startDate), 'd MMM HH:mm', {
                                                    locale: ru,
                                                })}
                                                &nbsp;&mdash;&nbsp;
                                                {format(new Date(endDate), 'd MMM HH:mm', {
                                                    locale: ru,
                                                })}
                                            </Text>
                                        </div>
                                    </SimpleCell>
                                </Group>
                                <Group>
                                    <div className={styles.menu}>
                                        <TabbarItem>
                                            <div
                                                className={styles.menuItem}
                                                onClick={this.navigateToSettings}
                                            >
                                                <Icon28SettingsOutline />
                                                <Subhead weight="regular">Настройки</Subhead>
                                            </div>
                                        </TabbarItem>
                                        <TabbarItem>
                                            <div
                                                className={styles.menuItem}
                                                onClick={this.handleShareClick}
                                            >
                                                <Icon28ShareExternalOutline />
                                                <Subhead weight="regular">Поделиться</Subhead>
                                            </div>
                                        </TabbarItem>
                                        <TabbarItem>
                                            <ContextNotifications />
                                        </TabbarItem>
                                    </div>
                                </Group>
                                <Group separator="hide">
                                    {!isEmpty(purchases) && (
                                        <Tabs mode={platform === IOS ? 'segmented' : 'default'}>
                                            <TabsItem
                                                onClick={this.handlePurchasesTabClick}
                                                selected={tab === 'purchases'}
                                            >
                                                Покупки
                                            </TabsItem>
                                            <TabsItem
                                                onClick={this.handleBalanceTabClick}
                                                selected={tab === 'balance'}
                                            >
                                                Долги
                                            </TabsItem>
                                        </Tabs>
                                    )}
                                </Group>
                                {tab === 'purchases' && <PurchaseList />}
                                {tab === 'balance' && (
                                    <>
                                        <Div />
                                        <BalanceList />
                                        {!isEmpty(event.transfers) && (
                                            <Group
                                                header={
                                                    <Header mode="secondary">
                                                        Выполненные переводы
                                                    </Header>
                                                }
                                            >
                                                <TransferList />
                                            </Group>
                                        )}
                                    </>
                                )}
                                <Footer />
                            </PullToRefresh>
                        );
                    }}
                </DelayedLoader>
            </Panel>
        );
    }
}
