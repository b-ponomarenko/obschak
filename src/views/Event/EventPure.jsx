import React, { PureComponent } from 'react';
import cx from 'classnames';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon20FollowersOutline from '@vkontakte/icons/dist/20/followers_outline';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import {
    Panel,
    PanelHeader,
    Button,
    PanelHeaderBack,
    RichCell,
    Tabs,
    UsersStack,
    TabsItem,
    Group,
    Div,
    Text,
    SimpleCell,
    Cell,
    PullToRefresh,
    Header,
    Footer,
} from '@vkontakte/vkui';
import styles from './Event.module.css';
import { plural } from '../../plural';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import pt from 'prop-types';
import Avatar from '../../components/Avatar/Avatar';
import BalanceList from './components/BalanceList/BalanceList';
import { currencies } from '../../conts/currencies';
import TransferList from './components/TransferList/TransferList';
import isEmpty from '@tinkoff/utils/is/empty';

export default class EventPure extends PureComponent {
    state = {
        tab: 'purchases',
    };

    static propTypes = {
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
        showLoader: pt.func,
        closePopout: pt.func,
        fetchEvent: pt.func,
        eventId: pt.string,
        route: pt.object,
        id: pt.string,
    };

    componentDidMount() {
        const { fetchEvent, event, eventId, closePopout, showLoader } = this.props;

        if (!event) {
            showLoader();
        }

        fetchEvent(eventId).finally(closePopout);
    }

    handlePurchasesTabClick = () => this.setState({ tab: 'purchases' });
    handleBalanceTabClick = () => this.setState({ tab: 'balance' });
    handleMembersClick = () => {
        const { showEventMembers, event } = this.props;

        showEventMembers({ title: 'Участники', users: event.users });
    };

    navigateToSettings = () => {
        const { eventId, navigateTo } = this.props;

        navigateTo('event.settings', { eventId });
    };

    navigateToCreatePurchase = () => {
        const { eventId, navigateTo } = this.props;

        navigateTo('event.create-purchase', { eventId });
    };

    navigateToPurchase = (purchaseId) => () => {
        const { eventId, navigateTo } = this.props;

        navigateTo('event.purchase', { eventId, purchaseId });
    };

    navigateBack = () => {
        const { navigateTo } = this.props;

        navigateTo('events');
    };

    handleRefreshEvent = () => {
        const { fetchEvent, eventId } = this.props;

        this.setState({ isFetching: true });
        fetchEvent(eventId).finally(() => this.setState({ isFetching: false }));
    };

    render() {
        const { event, user } = this.props;
        const { isFetching } = this.state;

        if (!event) {
            return (
                <Panel id="event">
                    <PanelHeader left={<PanelHeaderBack onClick={this.navigateBack} />}>
                        Событие
                    </PanelHeader>
                </Panel>
            );
        }

        const { title, users, startDate, endDate, photo, purchases } = event;
        const { tab } = this.state;

        return (
            <Panel id="event">
                <PanelHeader left={<PanelHeaderBack onClick={this.navigateBack} />}>
                    Событие
                </PanelHeader>
                <Group>
                    <RichCell
                        multiline
                        disabled
                        before={
                            <div className={styles.avatar}>
                                <Avatar src={photo} letter={title} size={72} />
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
                                <Icon20FollowersOutline style={{ padding: '0 6px 0 0' }} />
                            </div>
                        }
                    >
                        <div
                            className={cx(styles.info, styles.inactive)}
                            onClick={this.handleMembersClick}
                        >
                            <Text>
                                {users.length}{' '}
                                {plural(users.length, ['участник', 'участника', 'участников'])}
                            </Text>
                            <UsersStack
                                style={{ padding: '0 0 0 6px' }}
                                size="s"
                                photos={users.map((userId) => user[userId]?.photo_100)}
                            />
                        </div>
                    </SimpleCell>
                    <SimpleCell
                        disabled
                        before={
                            <div className={styles.inactive}>
                                <Icon20CalendarOutline style={{ padding: '0 6px 0 0' }} />
                            </div>
                        }
                    >
                        <div className={styles.inactive}>
                            <Text>
                                {format(new Date(startDate), 'd MMM HH:mm', { locale: ru })}
                                &nbsp;&mdash;&nbsp;
                                {format(new Date(endDate), 'd MMM HH:mm', { locale: ru })}
                            </Text>
                        </div>
                    </SimpleCell>
                </Group>
                <Group>
                    <Cell before={<Icon24Settings />} onClick={this.navigateToSettings} expandable>
                        Настройки
                    </Cell>
                </Group>
                <Group separator="hide">
                    <Tabs>
                        <TabsItem
                            onClick={this.handlePurchasesTabClick}
                            selected={tab === 'purchases'}
                        >
                            Покупки
                        </TabsItem>
                        <TabsItem onClick={this.handleBalanceTabClick} selected={tab === 'balance'}>
                            Долги
                        </TabsItem>
                    </Tabs>
                </Group>
                {tab === 'purchases' && (
                    <PullToRefresh onRefresh={this.handleRefreshEvent} isFetching={isFetching}>
                        <Group>
                            <Div>
                                <Button
                                    before={<Icon24Add />}
                                    size="xl"
                                    mode="secondary"
                                    onClick={this.navigateToCreatePurchase}
                                >
                                    Добавить покупку
                                </Button>
                            </Div>
                            {purchases.map(({ id, name, creatorId, value, currency, date }) => {
                                const currentUser = user[creatorId];

                                return (
                                    <RichCell
                                        key={id}
                                        before={
                                            <div className={styles.avatar}>
                                                <Avatar size={48} src={currentUser?.photo_100} />
                                            </div>
                                        }
                                        text={name}
                                        caption={format(new Date(date), "d MMM' в 'HH:mm", {
                                            locale: ru,
                                        })}
                                        after={`${value.toLocaleString('ru')} ${
                                            currencies[currency]
                                        }`}
                                        onClick={this.navigateToPurchase(id)}
                                    >
                                        {currentUser?.first_name} {currentUser?.last_name}
                                    </RichCell>
                                );
                            })}
                        </Group>
                    </PullToRefresh>
                )}
                {tab === 'balance' && (
                    <>
                        <Div />
                        <BalanceList />
                        {!isEmpty(event.transfers) && (
                            <Group header={<Header mode="secondary">Выполненные переводы</Header>}>
                                <TransferList />
                            </Group>
                        )}
                    </>
                )}
                <Footer />
            </Panel>
        );
    }
}
