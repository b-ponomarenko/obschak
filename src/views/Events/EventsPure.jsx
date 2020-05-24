import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import { isAfter } from 'date-fns';
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
    Placeholder,
    Button,
    PullToRefresh,
} from '@vkontakte/vkui';
import Icon28WriteSquareOutline from '@vkontakte/icons/dist/28/write_square_outline';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import EventItem from './components/EventItem/EventItem';
import styles from './EventsPure.module.css';
import isEmpty from '@tinkoff/utils/is/empty';
import memoize from 'memoize-one';
import { plural } from '../../plural';

const groupEvents = memoize((events, search) => {
    const now = new Date();
    const sortedEvents = events
        .filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => (isAfter(new Date(a.startDate), new Date(b.startDate)) ? 1 : -1));
    const pastEvents = [];
    const currentEvents = [];
    const futureEvents = [];

    sortedEvents.forEach((event) => {
        const { startDate, endDate } = event;
        const dStartDate = new Date(startDate);
        const dEndDate = new Date(endDate);

        if (isAfter(now, dStartDate) && isAfter(dEndDate, now)) {
            currentEvents.push(event);
        }

        if (isAfter(now, dEndDate)) {
            pastEvents.push(event);
        }

        if (isAfter(dStartDate, now)) {
            futureEvents.push(event);
        }
    });

    return [pastEvents, currentEvents, futureEvents];
});

export default class EventsPure extends PureComponent {
    state = {
        search: '',
    };

    static propTypes = {
        id: pt.string,
        events: pt.array,
        navigateToNewEvent: pt.func.isRequired,
        fetchEvents: pt.func.isRequired,
        openSpinner: pt.func.isRequired,
        closeSpinner: pt.func.isRequired,
    };

    componentDidMount() {
        const { fetchEvents, openSpinner, closeSpinner, events } = this.props;

        if (!events) {
            openSpinner();
        }

        fetchEvents().finally(() => closeSpinner());
    }

    handleRefresh = () => {
        const { fetchEvents } = this.props;

        this.setState({ fetching: true });
        fetchEvents().finally(() => this.setState({ fetching: false }));
    };

    handleSearchChange = (e) => this.setState({ search: e.target.value });

    render() {
        const { search, fetching } = this.state;
        const { events, navigateToNewEvent, id } = this.props;

        if (!events) {
            return (
                <Panel id={id}>
                    <PanelHeader
                        right={
                            <PanelHeaderButton onClick={navigateToNewEvent}>
                                <Icon28WriteSquareOutline />
                            </PanelHeaderButton>
                        }
                    >
                        События
                    </PanelHeader>
                    <FixedLayout>
                        <div className={styles.search}>
                            <Search value={search} />
                        </div>
                    </FixedLayout>
                </Panel>
            );
        }

        const [pastEvents, currentEvents, futureEvents] = groupEvents(events, search);
        const eventsCount = pastEvents.length + currentEvents.length + futureEvents.length;

        return (
            <Panel id={id}>
                <PanelHeader
                    right={
                        <PanelHeaderButton onClick={navigateToNewEvent}>
                            <Icon28WriteSquareOutline />
                        </PanelHeaderButton>
                    }
                >
                    События
                </PanelHeader>
                <FixedLayout>
                    <div className={styles.search}>
                        <Search value={search} onChange={this.handleSearchChange} />
                    </div>
                </FixedLayout>
                {!isEmpty(events) ? (
                    <PullToRefresh onRefresh={this.handleRefresh} isFetching={fetching}>
                        <div className={styles.list}>
                            <List>
                                {!isEmpty(currentEvents) && (
                                    <>
                                        <Group
                                            header={
                                                <Header mode="secondary">
                                                    <div className={styles.title}>
                                                        <div className={styles.iconFire}>
                                                            <Icon16Fire />
                                                        </div>
                                                        &nbsp;Текущие события
                                                    </div>
                                                </Header>
                                            }
                                        >
                                            {currentEvents.map((event) => (
                                                <EventItem key={event.id} event={event} />
                                            ))}
                                        </Group>
                                    </>
                                )}
                                {!isEmpty(futureEvents) && (
                                    <>
                                        <Group
                                            header={
                                                <Header mode="secondary">Будущие события</Header>
                                            }
                                        >
                                            {futureEvents.map((event) => (
                                                <EventItem key={event.id} event={event} />
                                            ))}
                                        </Group>
                                    </>
                                )}
                                {!isEmpty(pastEvents) && (
                                    <Group
                                        header={<Header mode="secondary">Прошедшие события</Header>}
                                    >
                                        {pastEvents.map((event) => (
                                            <EventItem key={event.id} event={event} />
                                        ))}
                                    </Group>
                                )}
                                {eventsCount === 0 && (
                                    <Placeholder
                                        icon={<Icon56DoNotDisturbOutline />}
                                        header="По Вашему запросу ничего не найдено"
                                    >
                                        Проверьте что нет ошибок и попробуйте изменить запрос
                                    </Placeholder>
                                )}
                            </List>
                        </div>
                        {eventsCount > 0 && (
                            <Footer>
                                {eventsCount}{' '}
                                {plural(eventsCount, ['событие', 'события', 'событий'])}
                            </Footer>
                        )}
                    </PullToRefresh>
                ) : (
                    <Placeholder
                        icon={<Icon56ErrorOutline />}
                        header="У Вас пока нет ни одного события"
                        action={
                            <Button size="l" onClick={navigateToNewEvent}>
                                Добавить событие
                            </Button>
                        }
                    >
                        Для того, чтобы у Вас появилось первое событие нажмите &ldquo;Добавить
                        событие&rdquo;
                    </Placeholder>
                )}
            </Panel>
        );
    }
}
