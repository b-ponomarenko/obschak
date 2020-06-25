import React, { PureComponent } from 'react';
import pt from 'prop-types';
import isEmpty from '@tinkoff/utils/is/empty';
import { format } from 'date-fns';
import Icon28UserAddOutline from '@vkontakte/icons/dist/28/user_add_outline';
import {
    Panel,
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
import { isBefore, addDays } from 'date-fns';
import styles from './CreateEvent.module.css';
import UploadedAvatar from '../../components/UploadedAvatar/UploadedAvatar';
import debounce from '@tinkoff/utils/function/debounce';

const getDateTimeString = (dateTime) => {
    if (!dateTime) {
        return;
    }

    const date = format(dateTime, 'yyyy-MM-dd');
    const time = format(dateTime, 'HH:mm');

    return `${date}T${time}`;
};

export default class CreateEventPure extends PureComponent {
    state = {
        friends: [],
        startDate: addDays(new Date(), 2),
        endDate: addDays(new Date(), 5),
    };

    static propTypes = {
        fetchFriends: pt.func,
        openModal: pt.func,
        openPopout: pt.func,
        createEvent: pt.func,
        navigateBack: pt.func,
        navigateToEvent: pt.func,
        uploadImage: pt.func,
        user: pt.object,
        showSpinner: pt.func,
        hideSpinner: pt.func,
    };

    fetchFriends = (search) => {
        const { fetchFriends, openModal } = this.props;

        return fetchFriends(search).then((friends) =>
            openModal({
                name: 'ADD_FRIENDS_MODAL',
                payload: {
                    friends,
                    selectedFriends: this.state.friends,
                    onClose: this.handleCloseModal,
                    onSearch: this.handleSearchModal,
                },
            })
        );
    };

    handleOpenModal = () => this.fetchFriends();

    handleCloseModal = (friends) => this.setState({ friends });

    handleSearchModal = debounce(500, (value) => this.fetchFriends(value));

    handleStartDateChange = (e) =>
        this.setState({ startDate: new Date(e.target.value), startDateError: false });
    handleEndDateChange = (e) =>
        this.setState({ endDate: new Date(e.target.value), endDateError: false });
    handleChangeTitle = (e) => this.setState({ title: e.target.value, titleError: false });

    handleImageChange = (image) => this.setState({ image });

    handleCreateEvent = () => {
        const {
            openPopout,
            createEvent,
            user,
            navigateToEvent,
            showSpinner,
            hideSpinner,
        } = this.props;
        const { friends, startDate, endDate, title, image } = this.state;
        const now = new Date();
        let isValid = true;

        if (!title) {
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

        if (isBefore(endDate, startDate)) {
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
                        'Для того, чтобы создать событие Вам необходимо добавить хотя бы одного друга',
                },
            });
        }

        if (!isValid) {
            return;
        }

        const friendsIds = friends.map(({ id }) => id);

        showSpinner();
        createEvent({
            title,
            startDate,
            endDate,
            users: friendsIds,
            creatorId: user.id,
            photo: image,
        })
            .then(({ event }) => navigateToEvent(event.id))
            .finally(hideSpinner);
    };

    handleDateSwitchClick = () => this.setState({ showDates: !this.state.showDates });

    render() {
        const { navigateBack } = this.props;
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
        const now = new Date();

        return (
            <Panel id="create-event">
                <PanelHeader left={<PanelHeaderBack onClick={navigateBack} />}>
                    Новое событие
                </PanelHeader>
                <div className={styles.container}>
                    <RichCell
                        multiline
                        disabled
                        before={
                            <UploadedAvatar image={image} onImageChange={this.handleImageChange} />
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
                                    min={getDateTimeString(now)}
                                    max={getDateTimeString(endDate)}
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
                                    min={getDateTimeString(startDate || now)}
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
                            <SimpleCell key={id} before={<Avatar size={40} src={photo_100} />}>
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
