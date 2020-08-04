import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon28UserAddOutline from '@vkontakte/icons/dist/28/user_add_outline';
import {
    Header,
    PanelHeader,
    PanelHeaderBack,
    Group,
    Cell,
    Avatar,
    CellButton,
    Input,
    RichCell,
    ANDROID,
} from '@vkontakte/vkui';
import debounce from '@tinkoff/utils/function/debounce';
import UploadedAvatar from '../../components/UploadedAvatar/UploadedAvatar';
import styles from './EventSettingsPure.module.css';
import { getImage } from '../../utils/image';
import Panel from '../../components/Panel/Panel';
import DeletableCellIOS from './DeletableCellIOS/DeletableCellIOS';
import SimplifyDebtsSettings from '../../components/SimplifyDebtsSettings/SimplifyDebtsSettings';

const initialState = ({ event }) => ({
    ...event,
});

export default class EventSettingsPure extends PureComponent {
    state = initialState(this.props);

    static propTypes = {
        platform: pt.string,
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
        const { openAddFriendsModal, showSpinner, fetchFriends, hideSpinner } = this.props;
        const { users } = this.state;

        showSpinner();
        return fetchFriends(search)
            .then((payload) =>
                openAddFriendsModal({
                    friends: payload.items.filter(({ id }) => !users.includes(id)),
                    selectedFriends: [],
                    onClose: this.handleCloseModal,
                    onSearch: this.handleSearch,
                })
            )
            .finally(hideSpinner);
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
    handleTitleChange = (e) =>
        this.setState({ title: e.target.value.slice(0, 30), titleError: false });

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
            showSpinner,
            hideSpinner,
        } = this.props;

        showSpinner();
        updateEvent({
            ...event,
            users: event.users.filter((userId) => userId !== currentUser.id),
        })
            .then(fetchEvents)
            .then(this.goToEvents)
            .finally(hideSpinner);
    };

    handleDeleteEvent = () => {
        const { deleteEvent, event, fetchEvents, showSpinner, hideSpinner } = this.props;

        showSpinner();
        return deleteEvent(event.id).then(fetchEvents).then(this.goToEvents).finally(hideSpinner);
    };

    handleSaveEvent = () => {
        const { updateEvent, event, showSpinner, hideSpinner } = this.props;
        const { users, photo, title, debtType } = this.state;

        if (!title.trim()) {
            return this.setState({ titleError: true });
        }

        showSpinner();
        return updateEvent({
            ...event,
            users,
            photo,
            debtType,
            title: title.trim(),
        })
            .then(this.handleBackClick)
            .finally(hideSpinner);
    };

    handleBackClick = () => window.history.back();

    goToEvents = () => window.history.go(-2);

    handleDebtTypeChange = (debtType) => this.setState({ debtType });

    render() {
        const { event, user, currentUser, platform } = this.props;
        const { creatorId } = event;
        const { users, photo, title, titleError, debtType } = this.state;

        return (
            <Panel id="event.settings" previousView="event">
                <PanelHeader left={<PanelHeaderBack onClick={this.handleBackClick} />}>
                    Настройки события
                </PanelHeader>
                <RichCell
                    multiline
                    disabled
                    before={
                        <UploadedAvatar
                            image={getImage(photo, 'xs')}
                            onImageChange={this.handleImageChange}
                        />
                    }
                >
                    <Input
                        placeholder="Название события"
                        value={title}
                        onChange={this.handleTitleChange}
                        status={titleError && 'error'}
                        bottom={titleError && 'Введите название события'}
                    />
                </RichCell>
                <SimplifyDebtsSettings debtType={debtType} onChange={this.handleDebtTypeChange} />
                <Group header={<Header mode="secondary">Участники</Header>}>
                    <CellButton
                        before={<Icon28UserAddOutline />}
                        onClick={this.handleOpenFriendsModal}
                    >
                        Добавить участника
                    </CellButton>
                    {users.map((userId) => {
                        const member = user[userId];
                        const removable =
                            (currentUser.id === creatorId || !event.users.includes(userId)) &&
                            userId !== currentUser.id &&
                            users.length > 2;

                        return platform === ANDROID || !removable ? (
                            <Cell
                                key={userId}
                                removable={removable}
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
                        ) : (
                            <DeletableCellIOS
                                removable
                                key={userId}
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
                            </DeletableCellIOS>
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
