import React from 'react';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    List,
    SimpleCell,
    Avatar,
} from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

const UsersModal = ({ id, payload }) => {
    const { title, users, onClose } = payload;
    const user = useSelector(({ user }) => user);

    return (
        <ModalPage
            id={id}
            header={
                <ModalPageHeader
                    right={<PanelHeaderButton onClick={onClose}>Готово</PanelHeaderButton>}
                >
                    {title}
                </ModalPageHeader>
            }
        >
            <Group>
                <List>
                    {users.map((id) => {
                        const currentUser = user[id];

                        return (
                            <SimpleCell
                                key={id}
                                before={<Avatar size={40} src={currentUser?.photo_100} />}
                            >
                                {currentUser?.first_name} {currentUser?.last_name}
                            </SimpleCell>
                        );
                    })}
                </List>
            </Group>
        </ModalPage>
    );
};

export default UsersModal;
