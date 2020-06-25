import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon28UserAddOutline from '@vkontakte/icons/dist/28/user_add_outline';
import {
    Header,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Group,
    Cell,
    Avatar,
    CellButton,
    Input,
    RichCell,
} from '@vkontakte/vkui';
import debounce from '@tinkoff/utils/function/debounce';
import UploadedAvatar from '../../components/UploadedAvatar/UploadedAvatar';
import styles from './EventSettingsPure.module.css';

const initialState = ({ event }) => ({
    ...event,
});

export default class EventSettingsPure extends PureComponent {
    state = initialState(this.props);

    static propTypes = {
        navigateTo: pt.func,
        openAddFriendsModal: pt.func,
        fetchFriends: pt.func,
        fetchUsers: pt.func,
        fetchEvents: pt.func,
        deleteEvent: pt.func,
        route: pt.object,
        event: pt.object,
        user: pt.object,
        currentUser: pt.object,
        fetchEvent: pt.func,
        updateEvent: pt.func,
        openPopout: pt.func,
        closePopout: pt.func,
        showSpinner: pt.func,
        hideSpinner: pt.func,
    };

    componentDidMount() {
        const { fetchEvent, route } = this.props;
        const { eventId } = route.params;

        fetchEvent(eventId);
    }

    fetchFriends = (search) => {
        const { openAddFriendsModal, fetchFriends } = this.props;
        const { users } = this.state;

        fetchFriends(search).then((friends) =>
            openAddFriendsModal({
                friends: friends.filter(({ id }) => !users.includes(id)),
                selectedFriends: [],
                onClose: this.handleCloseModal,
                onSearch: this.handleSearch,
            })
        );
    };

    navigateBack = () => {
        const { navigateTo, route } = this.props;
        const { eventId } = route.params;

        navigateTo('event', { eventId });
    };

    handleRemove = (userId) =>
        this.setState({ users: this.state.users.filter((id) => id !== userId) });

    handleOpenFriendsModal = () => this.fetchFriends();

    handleCloseModal = (selectedFriends) => {
        const { fetchUsers } = this.props;
        const selectedFriendsIds = selectedFriends.map(({ id }) => id);

        return fetchUsers(selectedFriendsIds).then(() =>
            this.setState({ users: [...this.state.users, ...selectedFriendsIds] })
        );
    };

    handleSearchDebounced = debounce(500, () => {
        const { search } = this.state;

        return this.fetchFriends(search);
    });

    handleSearch = (search) => this.setState({ search }, this.handleSearchDebounced);

    handleImageChange = (photo) => this.setState({ photo });
    handleTitleChange = (title) => this.setState({ title, titleError: false });

    handleOpenLeaveEventConfirmationPopup = () => {
        const { openPopout } = this.props;

        openPopout({
            name: 'LEAVE_EVENT_CONFIRMATION',
            payload: { onLeaveEvent: this.handleLeaveEvent },
        });
    };

    handleOpenDeleteEventConfirmationPopup = () => {
        const { openPopout } = this.props;

        openPopout({
            name: 'DELETE_EVENT_CONFIRMATION',
            payload: { onDeleteEvent: this.handleDeleteEvent },
        });
    };

    handleLeaveEvent = () => {
        const {
            updateEvent,
            fetchEvents,
            currentUser,
            event,
            navigateTo,
            showSpinner,
            hideSpinner,
        } = this.props;

        showSpinner();
        updateEvent({
            ...event,
            users: event.users.filter((userId) => userId !== currentUser.id),
        })
            .then(fetchEvents)
            .then(() => navigateTo('events'))
            .finally(hideSpinner);
    };

    handleDeleteEvent = () => {
        const {
            deleteEvent,
            event,
            fetchEvents,
            navigateTo,
            showSpinner,
            hideSpinner,
        } = this.props;

        showSpinner();
        return deleteEvent(event.id)
            .then(fetchEvents)
            .then(() => navigateTo('events'))
            .finally(hideSpinner);
    };

    handleSaveEvent = () => {
        const { updateEvent, event, showSpinner, hideSpinner } = this.props;
        const { users, photo, title } = this.state;

        if (!title) {
            return this.setState({ titleError: true });
        }

        showSpinner();
        return updateEvent({
            ...event,
            users,
            photo,
            title,
        })
            .then(this.navigateBack)
            .finally(hideSpinner);
    };

    render() {
        const { event, user, currentUser } = this.props;
        const { creatorId } = event;
        const { users, photo, title, titleError } = this.state;

        return (
            <Panel id="event.settings">
                <PanelHeader left={<PanelHeaderBack onClick={this.navigateBack} />}>
                    Настройки события
                </PanelHeader>
                <RichCell
                    multiline
                    disabled
                    before={<UploadedAvatar image={photo} onImageChange={this.handleImageChange} />}
                >
                    <Input
                        placeholder="Название события"
                        value={title}
                        onChange={this.handleTitleChange}
                        status={titleError && 'error'}
                        bottom={titleError && 'Введите название события'}
                    />
                </RichCell>
                <Group header={<Header mode="secondary">Участники</Header>}>
                    <CellButton
                        before={<Icon28UserAddOutline />}
                        onClick={this.handleOpenFriendsModal}
                    >
                        Добавить участника
                    </CellButton>
                    {users.map((userId) => {
                        const member = user[userId];

                        return (
                            <Cell
                                key={userId}
                                removable={
                                    (currentUser.id === creatorId ||
                                        !event.users.includes(userId)) &&
                                    userId !== currentUser.id &&
                                    users.length > 2
                                }
                                before={<Avatar size={40} src={member?.photo_100} />}
                                onRemove={() => this.handleRemove(userId)}
                                asideContent={
                                    userId === creatorId && (
                                        <div className={styles.userIcon}>
                                            <Icon24Favorite width={16} height={16} />
                                        </div>
                                    )
                                }
                            >
                                {member?.first_name} {member?.last_name}
                            </Cell>
                        );
                    })}
                </Group>
                <Group>
                    <CellButton onClick={this.handleSaveEvent}>Сохранить событие</CellButton>
                    <CellButton mode="danger" onClick={this.handleOpenLeaveEventConfirmationPopup}>
                        Покинуть событие
                    </CellButton>
                    {currentUser.id === event.creatorId && (
                        <CellButton
                            mode="danger"
                            onClick={this.handleOpenDeleteEventConfirmationPopup}
                        >
                            Удалить событие
                        </CellButton>
                    )}
                </Group>
            </Panel>
        );
    }
}
