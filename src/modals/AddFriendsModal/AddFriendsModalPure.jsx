import React, { PureComponent } from 'react';
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';
import pt from 'prop-types';
import styles from './AddFriendsModal.module.css';
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';
import {
    Avatar,
    Caption,
    Cell,
    Div,
    List,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Placeholder,
    Search,
    Spinner,
} from '@vkontakte/vkui';
import isEmpty from '@tinkoff/utils/is/empty';
import HorizontalScroll from '../../components/HorizontallScroll/HorizontallScroll';
import InfinityScroll from '../../components/InfinityScroll/InfinityScroll';

export default class AddFriendsModalPure extends PureComponent {
    state = {
        selectedFriends: this.props.payload.selectedFriends,
        friends: [],
    };

    static propTypes = {
        payload: pt.shape({
            friends: pt.array,
            selectedFriends: pt.array,
            onClose: pt.func,
            onSearch: pt.func,
        }),
        closeModal: pt.func,
        fetchMoreFriends: pt.func,
        id: pt.string,
    };

    handleRemoveFriend = (friend) => {
        const { selectedFriends } = this.state;

        this.setState({ selectedFriends: selectedFriends.filter(({ id }) => id !== friend.id) });
    };

    handleClose = () => {
        const { payload, closeModal } = this.props;
        const { onClose } = payload;
        const { selectedFriends } = this.state;

        onClose(selectedFriends);
        closeModal();
    };

    toggleSelectFriend = (friend) => {
        const { id } = friend;
        const { selectedFriends } = this.state;

        if (selectedFriends.map(({ id }) => id).includes(id)) {
            return this.handleRemoveFriend(friend);
        }

        return this.setState({ selectedFriends: [...selectedFriends, friend] });
    };

    handleSearch = (e) => {
        this.setState({ search: e.target.value, friends: [] });
        return this.props.payload.onSearch(e.target.value);
    };

    handleFetchFriends = () => {
        const { fetchMoreFriends, payload } = this.props;
        const { friends } = payload;
        const { search, total } = this.state;
        const offset = this.state.friends.length + friends.length;

        if (total === offset) {
            return;
        }

        this.setState({ loading: true });
        return fetchMoreFriends({ offset, q: search })
            .then((data) =>
                this.setState({
                    friends: [...this.state.friends, ...data.items],
                    total: data.count,
                })
            )
            .finally(() => this.setState({ loading: false }));
    };

    render() {
        const { id, payload } = this.props;
        const { selectedFriends, loading } = this.state;
        const friends = [...payload.friends, ...this.state.friends];

        return (
            <ModalPage
                settlingHeight={80}
                id={id}
                header={
                    <ModalPageHeader
                        right={
                            <PanelHeaderButton onClick={this.handleClose}>Готово</PanelHeaderButton>
                        }
                    >
                        Друзья
                    </ModalPageHeader>
                }
            >
                <Search onChange={this.handleSearch} />
                {!isEmpty(selectedFriends) && !isEmpty(friends) && (
                    <HorizontalScroll>
                        <Div>
                            {selectedFriends.map((friend) => {
                                const { id, photo_100, first_name } = friend;

                                return (
                                    <div className={styles.user} key={id}>
                                        <Avatar size={60} src={photo_100} />
                                        <div
                                            className={styles.deleteIcon}
                                            onClick={() => this.handleRemoveFriend(friend)}
                                        >
                                            <Icon24DismissDark />
                                        </div>
                                        <Caption className={styles.name} level="2">
                                            {first_name}
                                        </Caption>
                                    </div>
                                );
                            })}
                        </Div>
                    </HorizontalScroll>
                )}
                {isEmpty(friends) && (
                    <Placeholder icon={<Icon56UsersOutline />} header="Не найдено ни одного друга">
                        Проверьте что нет ошибок и попробуйте изменить запрос
                    </Placeholder>
                )}
                <List>
                    <InfinityScroll
                        next={this.handleFetchFriends}
                        loadingComponent={<Spinner size="medium" />}
                        loading={loading}
                    >
                        {friends.map((friend) => {
                            const { id, photo_100, first_name, last_name } = friend;

                            return (
                                <Cell
                                    checked={selectedFriends.map(({ id }) => id).includes(id)}
                                    key={id}
                                    selectable
                                    before={<Avatar size={40} src={photo_100} />}
                                    onClick={() => this.toggleSelectFriend(friend)}
                                >
                                    {first_name} {last_name}
                                </Cell>
                            );
                        })}
                    </InfinityScroll>
                </List>
            </ModalPage>
        );
    }
}
