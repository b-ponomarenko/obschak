import React from 'react';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Search,
    List,
    SimpleCell,
    Avatar,
} from '@vkontakte/vkui';

const UsersModal = ({ id, payload }) => {
    const { title, users, onClose } = payload;

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
            <Search />
            <List>
                {users.map(({ id, firstName, lastName, avatar }) => (
                    <SimpleCell key={id} before={<Avatar size={40} src={avatar} />}>
                        {firstName} {lastName}
                    </SimpleCell>
                ))}
            </List>
        </ModalPage>
    );
};

export default UsersModal;
