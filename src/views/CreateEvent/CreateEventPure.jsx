import React, { PureComponent } from 'react';
import pt from 'prop-types';
import isEmpty from '@tinkoff/utils/is/empty';
import { format, startOfHour, addHours, isBefore, isEqual, addDays } from 'date-fns';
import ru from 'date-fns/locale/ru';
import Icon28UserAddOutline from '@vkontakte/icons/dist/28/user_add_outline';
import {
    PanelHeaderBack,
    PanelHeader,
    RichCell,
    Input,
    Avatar,
    Group,
    Header,
    FormLayout,
    FormLayoutGroup,
    FixedLayout,
    Button,
    SimpleCell,
    CellButton,
    Switch,
} from '@vkontakte/vkui';
import styles from './CreateEvent.module.css';
import UploadedAvatar from '../../components/UploadedAvatar/UploadedAvatar';
import debounce from '@tinkoff/utils/function/debounce';
import { getImage } from '../../utils/image';
import Panel from '../../components/Panel/Panel';

const getDateTimeString = (dateTime) => {
    if (!dateTime) {
        return;
    }

    const date = format(dateTime, 'yyyy-MM-dd', { locale: ru });
    const time = format(dateTime, 'HH:mm', { locale: ru });

    return `${date}T${time}`;
};

const prepareDate = (dateTimeString) => {
    if (!dateTimeString) {
        return;
    }

    const [date, time] = dateTimeString.split('T');
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute);
};

export default class CreateEventPure extends PureComponent {
    startDate = startOfHour(addHours(addDays(new Date(), 2), 1));
    endDate = startOfHour(addHours(addDays(new Date(), 3), 1));

    state = {
        friends: [],
        startDate: this.startDate,
        endDate: this.endDate,
        title: '',
    };

    static propTypes = {
        fetchFriends: pt.func,
        openModal: pt.func,
        openPopout: pt.func,
        createEvent: pt.func,
        navigateTo: pt.func,
        user: pt.object,
        showSpinner: pt.func,
        hideSpinner: pt.func,
    };

    fetchFriends = (search) => {
        const { fetchFriends, hideSpinner, showSpinner, openModal } = this.props;

        showSpinner();
        return fetchFriends(search)
            .then((payload) =>
                openModal({
                    name: 'ADD_FRIENDS_MODAL',
                    payload: {
                        friends: payload.items,
                        selectedFriends: this.state.friends,
                        onClose: this.handleCloseModal,
                        onSearch: this.handleSearchModal,
                    },
                })
            )
            .finally(hideSpinner);
    };

    handleOpenModal = () => this.fetchFriends();

    handleCloseModal = (friends) => this.setState({ friends });

    handleSearchModal = debounce(500, (value) => this.fetchFriends(value));

    handleStartDateChange = (e) =>
        this.setState({
            startDate: prepareDate(e.target.value) || this.startDate,
            startDateError: false,
        });
    handleEndDateChange = (e) =>
        this.setState({
            endDate: prepareDate(e.target.value) || this.endDate,
            endDateError: false,
        });
    handleChangeTitle = (e) =>
        this.setState({ title: e.target.value.slice(0, 30), titleError: false });

    handleImageChange = (image) => this.setState({ image });

    handleCreateEvent = () => {
        const { openPopout, createEvent, user, showSpinner, hideSpinner, navigateTo } = this.props;
        const { friends, startDate, endDate, title, image } = this.state;
        const now = new Date();
        let isValid = true;

        if (!title.trim()) {
            isValid = false;
            this.setState({ titleError: true });
        }

        if (!startDate) {
            isValid = false;
            this.setState({
                startDateError: true,
                startDateErrorMessage: 'Укажите дату начала события',
            });
        }

        if (isBefore(startDate, now)) {
            isValid = false;
            this.setState({
                startDateError: true,
                startDateErrorMessage: 'Дата начала должна быть позже текущей даты',
            });
        }

        if (!endDate) {
            isValid = false;
            this.setState({
                endDateError: true,
                endDateErrorMessage: 'Укажите дату окончания события',
            });
        }

        if (isBefore(endDate, startDate) || isEqual(endDate, startDate)) {
            isValid = false;
            this.setState({
                endDateError: true,
                endDateErrorMessage: 'Дата окончания должна быть позже даты начала события',
            });
        }

        if (isEmpty(friends)) {
            isValid = false;
            openPopout({
                name: 'NOTIFICATION_POPOUT',
                payload: {
                    title: 'Ни одного друга не выбрано',
                    description:
                        'Для того чтобы создать событие, Вам необходимо добавить хотя бы одного друга.',
                },
            });
        }

        if (!isValid) {
            return window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        const friendsIds = friends.map(({ id }) => id);

        showSpinner();
        return createEvent({
            title: title.trim(),
            startDate,
            endDate,
            users: friendsIds,
            creatorId: user.id,
            photo: image,
        })
            .then(({ event }) => navigateTo('event', { eventId: event.id }, { replace: true }))
            .finally(hideSpinner);
    };

    handleDateSwitchClick = () => this.setState({ showDates: !this.state.showDates });

    handleNavigateBack = () => window.history.back();

    render() {
        const {
            friends,
            startDate,
            endDate,
            title,
            image,
            titleError,
            startDateError,
            endDateError,
            startDateErrorMessage,
            endDateErrorMessage,
            showDates,
        } = this.state;

        return (
            <Panel id="create-event" previousView="events">
                <PanelHeader left={<PanelHeaderBack onClick={this.handleNavigateBack} />}>
                    Новое событие
                </PanelHeader>
                <div className={styles.container}>
                    <RichCell
                        multiline
                        disabled
                        before={
                            <UploadedAvatar
                                image={getImage(image, 'xs')}
                                onImageChange={this.handleImageChange}
                            />
                        }
                        caption={
                            <div className={styles.caption}>
                                Введите название и при желании загрузите фотографию
                            </div>
                        }
                    >
                        <Input
                            placeholder="Название события"
                            value={title}
                            onChange={this.handleChangeTitle}
                            status={titleError && 'error'}
                            bottom={titleError && 'Введите название события'}
                        />
                    </RichCell>
                    <SimpleCell
                        disabled
                        after={<Switch checked={showDates} onClick={this.handleDateSwitchClick} />}
                    >
                        Указать даты
                    </SimpleCell>
                    {showDates && (
                        <FormLayout>
                            <FormLayoutGroup
                                top="Время начала"
                                status={startDateError && 'error'}
                                bottom={startDateErrorMessage}
                            >
                                <Input
                                    type="datetime-local"
                                    onChange={this.handleStartDateChange}
                                    status={startDateError && 'error'}
                                    value={getDateTimeString(startDate)}
                                />
                            </FormLayoutGroup>
                            <FormLayoutGroup
                                top="Время окончания"
                                status={endDateError && 'error'}
                                bottom={endDateErrorMessage}
                            >
                                <Input
                                    type="datetime-local"
                                    onChange={this.handleEndDateChange}
                                    status={endDateError && 'error'}
                                    value={getDateTimeString(endDate)}
                                />
                            </FormLayoutGroup>
                        </FormLayout>
                    )}
                    <Group header={<Header mode="secondary">Участники</Header>}>
                        <CellButton
                            onClick={this.handleOpenModal}
                            before={<Icon28UserAddOutline />}
                        >
                            Добавить участника
                        </CellButton>
                        {friends.map(({ id, photo_100, first_name, last_name }) => (
                            <SimpleCell
                                key={id}
                                before={<Avatar size={40} src={photo_100} />}
                                disabled
                            >
                                {first_name} {last_name}
                            </SimpleCell>
                        ))}
                    </Group>
                </div>
                <FixedLayout vertical="bottom">
                    <div className={styles.createButton}>
                        <Button align="center" size="xl" onClick={this.handleCreateEvent}>
                            Создать событие
                        </Button>
                    </div>
                </FixedLayout>
            </Panel>
        );
    }
}
