import React, { PureComponent } from 'react';
import pt from 'prop-types';
import isEmpty from '@tinkoff/utils/is/empty';
import { format } from 'date-fns';
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
} from '@vkontakte/vkui';
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
        const { openPopout, createEvent, user, navigateToEvent } = this.props;
        const { friends, startDate, endDate, title, image } = this.state;
        let isValid = true;

        if (!title) {
            isValid = false;
            this.setState({ titleError: true });
        }

        if (!startDate) {
            isValid = false;
            this.setState({ startDateError: true });
        }

        if (!endDate) {
            isValid = false;
            this.setState({ endDateError: true });
        }

        if (isEmpty(friends)) {
            isValid = false;
            openPopout({ name: 'NO_FRIENDS_SELECTED' });
        }

        if (!isValid) {
            return;
        }

        const friendsIds = friends.map(({ id }) => id);

        createEvent({
            title,
            startDate,
            endDate,
            users: friendsIds,
            creatorId: user.id,
            photo: image,
        }).then(({ event }) => navigateToEvent(event.id));
    };

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
                    <FormLayout>
                        <FormLayoutGroup top="Время начала">
                            <Input
                                type="datetime-local"
                                min={getDateTimeString(now)}
                                max={getDateTimeString(endDate)}
                                onChange={this.handleStartDateChange}
                                status={startDateError && 'error'}
                            />
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Время окончания">
                            <Input
                                type="datetime-local"
                                min={getDateTimeString(startDate || now)}
                                onChange={this.handleEndDateChange}
                                status={endDateError && 'error'}
                            />
                        </FormLayoutGroup>
                        <FormLayoutGroup>
                            <Button
                                align="center"
                                size="xl"
                                mode="secondary"
                                onClick={this.handleOpenModal}
                            >
                                Добавить друзей
                            </Button>
                        </FormLayoutGroup>
                    </FormLayout>
                    {!isEmpty(friends) && (
                        <Group>
                            <Header mode="secondary">Участники</Header>
                            {friends.map(({ id, photo_100, first_name, last_name }) => (
                                <SimpleCell key={id} before={<Avatar size={40} src={photo_100} />}>
                                    {first_name} {last_name}
                                </SimpleCell>
                            ))}
                        </Group>
                    )}
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
