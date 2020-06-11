import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon56DoNotDisturbOutline from '@vkontakte/icons/dist/56/do_not_disturb_outline';
import Icon28ListAddOutline from '@vkontakte/icons/dist/28/list_add_outline';
import { isAfter } from 'date-fns';
import {
    Footer,
    Group,
    Header,
    List,
    Panel,
    PanelHeader,
    Placeholder,
    Button,
    PullToRefresh,
    CellButton,
} from '@vkontakte/vkui';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import EventItem from './components/EventItem/EventItem';
import styles from './EventsPure.module.css';
import isEmpty from '@tinkoff/utils/is/empty';
import memoize from '@tinkoff/utils/function/memoize/one';
import { plural } from '../../plural';

const groupEvents = memoize((events) => {
    const now = new Date();
    const sortedEvents = [...events].sort((a, b) =>
        isAfter(new Date(a.startDate), new Date(b.startDate)) ? 1 : -1
    );
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
    state = {};

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

    render() {
        const { fetching } = this.state;
        const { events, navigateToNewEvent, id } = this.props;

        if (!events) {
            return (
                <Panel id={id}>
                    <PanelHeader>События</PanelHeader>
                </Panel>
            );
        }

        const [pastEvents, currentEvents, futureEvents] = groupEvents(events);
        const eventsCount = pastEvents.length + currentEvents.length + futureEvents.length;

        return (
            <Panel id={id}>
                <PanelHeader>События</PanelHeader>
                {!isEmpty(events) ? (
                    <PullToRefresh onRefresh={this.handleRefresh} isFetching={fetching}>
                        <Group>
                            <CellButton
                                before={<Icon28ListAddOutline />}
                                onClick={navigateToNewEvent}
                            >
                                Добавить событие
                            </CellButton>
                        </Group>
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
                                        header={<Header mode="secondary">Будущие события</Header>}
                                    >
                                        {futureEvents.map((event) => (
                                            <EventItem key={event.id} event={event} />
                                        ))}
                                    </Group>
                                </>
                            )}
                            {!isEmpty(pastEvents) && (
                                <Group header={<Header mode="secondary">Прошедшие события</Header>}>
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
