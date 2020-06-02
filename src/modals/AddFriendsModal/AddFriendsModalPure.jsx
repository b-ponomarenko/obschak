import React, { PureComponent } from 'react';
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
    Search,
    HorizontalScroll,
} from '@vkontakte/vkui';
import isEmpty from '@tinkoff/utils/is/empty';

export default class AddFriendsModalPure extends PureComponent {
    state = {
        selectedFriends: this.props.payload.selectedFriends,
    };

    static propTypes = {
        payload: pt.shape({
            friends: pt.array,
            selectedFriends: pt.array,
            onClose: pt.func,
            onSearch: pt.func,
        }),
        closeModal: pt.func,
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

    handleSearch = (e) => this.props.payload.onSearch(e.target.value);

    render() {
        const { id, payload } = this.props;
        const { friends } = payload;
        const { selectedFriends } = this.state;

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
                {!isEmpty(selectedFriends) && (
                    <HorizontalScroll>
                        <Div style={{ display: 'flex' }}>
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
                                        <div className={styles.name}>
                                            <Caption level="2">{first_name}</Caption>
                                        </div>
                                    </div>
                                );
                            })}
                        </Div>
                    </HorizontalScroll>
                )}
                <List>
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
                </List>
            </ModalPage>
        );
    }
}
