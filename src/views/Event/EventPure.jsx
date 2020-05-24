import React, { PureComponent } from 'react';
import cx from 'classnames';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon20FollowersOutline from '@vkontakte/icons/dist/20/followers_outline';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon16Down from '@vkontakte/icons/dist/16/down';
import {
    Panel,
    PanelHeader,
    Button,
    PanelHeaderButton,
    PanelHeaderBack,
    RichCell,
    Tabs,
    UsersStack,
    TabsItem,
    Group,
    Div,
    Text,
    SimpleCell,
} from '@vkontakte/vkui';
import styles from './Event.module.css';
import { plural } from '../../plural';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import pt from 'prop-types';
import Avatar from '../../components/Avatar/Avatar';

export default class EventPure extends PureComponent {
    state = {
        tab: 'purchases',
    };

    static propTypes = {
        event: pt.shape({
            id: pt.number,
            title: pt.string,
            photo: pt.string,
            startDate: pt.string,
            endDate: pt.string,
            users: pt.array,
        }),
        navigateTo: pt.func,
        showBalanceActions: pt.func,
        showEventMembers: pt.func,
        fetchEvent: pt.func,
        eventId: pt.string,
        route: pt.object,
        id: pt.string,
    };

    componentDidMount() {
        const { fetchEvent, eventId } = this.props;

        fetchEvent(eventId);
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

    render() {
        const { showBalanceActions, event } = this.props;

        if (!event) {
            return (
                <Panel id="event">
                    <PanelHeader
                        left={<PanelHeaderBack onClick={this.navigateBack} />}
                        right={
                            <PanelHeaderButton>
                                <Icon28SettingsOutline />
                            </PanelHeaderButton>
                        }
                    >
                        Событие
                    </PanelHeader>
                </Panel>
            );
        }

        const { title, users, startDate, endDate, photo, purchases = [] } = event;
        const { tab } = this.state;

        return (
            <Panel id="event">
                <PanelHeader
                    left={<PanelHeaderBack onClick={this.navigateBack} />}
                    right={
                        <PanelHeaderButton onClick={this.navigateToSettings}>
                            <Icon28SettingsOutline />
                        </PanelHeaderButton>
                    }
                >
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
                                photos={users.map(({ avatar }) => avatar)}
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
                                {format(new Date(startDate), 'd MMM hh:mm', { locale: ru })}
                                &nbsp;&mdash;&nbsp;
                                {format(new Date(endDate), 'd MMM hh:mm', { locale: ru })}
                            </Text>
                        </div>
                    </SimpleCell>
                </Group>
                <Tabs>
                    <TabsItem onClick={this.handlePurchasesTabClick} selected={tab === 'purchases'}>
                        Покупки
                    </TabsItem>
                    <TabsItem onClick={this.handleBalanceTabClick} selected={tab === 'balance'}>
                        Долги
                    </TabsItem>
                </Tabs>
                {tab === 'purchases' && (
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
                        {purchases.map(({ id, title, user, price, date }) => (
                            <RichCell
                                key={id}
                                before={
                                    <div className={styles.avatar}>
                                        <Avatar size={48} src={user.avatar} />
                                    </div>
                                }
                                text={title}
                                caption={format(date, 'dd.mm.YYYY', { locale: ru })}
                                after={price.value + price.currency}
                                onClick={this.navigateToPurchase(id)}
                            >
                                {user.firstName} {user.lastName}
                            </RichCell>
                        ))}
                    </Group>
                )}
                {tab === 'balance' && (
                    <Group>
                        <RichCell
                            onClick={showBalanceActions}
                            before={
                                <div className={styles.avatarContainer}>
                                    <div className={styles.userFrom}>
                                        <Avatar
                                            size={44}
                                            src="https://sun9-22.userapi.com/c638922/v638922920/5bd0a/z4F2vpLqYYE.jpg?ava=1"
                                        />
                                    </div>
                                    <div className={styles.userTo}>
                                        <Avatar
                                            size={44}
                                            src="https://sun9-16.userapi.com/c847216/v847216292/14ad40/DrQnejTNpBk.jpg?ava=1"
                                        />
                                    </div>
                                </div>
                            }
                            after="+ 1 500 ₽"
                        >
                            <div className={styles.balanceContent}>
                                Александр&nbsp;
                                <div className={styles.icon}>
                                    <Icon16Down />
                                </div>
                                &nbsp;Константин
                            </div>
                        </RichCell>
                    </Group>
                )}
            </Panel>
        );
    }
}
