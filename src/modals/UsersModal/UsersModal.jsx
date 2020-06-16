import React, { useCallback, useState } from 'react';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
import Icon20UserOutline from '@vkontakte/icons/dist/20/user_outline';
import pt from 'prop-types';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    List,
    SimpleCell,
    Avatar,
} from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import closeModal from '../../actions/closeModal';
import useCurrentEvent from '../../hooks/useCurrentEvent';

const UsersModal = ({ id, payload }) => {
    const { title, users, onClose, selectable, value, showCreator } = payload;
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(selectable ? value : undefined);
    const user = useSelector(({ user }) => user);
    const handleClose = useCallback(() => {
        onClose(selectable ? selected : undefined);
        dispatch(closeModal());
    }, [selected]);
    const event = useCurrentEvent();

    return (
        <ModalPage
            id={id}
            header={
                <ModalPageHeader
                    right={<PanelHeaderButton onClick={handleClose}>Готово</PanelHeaderButton>}
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
                                onClick={() => setSelected(id)}
                                after={
                                    selectable && id === selected ? (
                                        <Icon28DoneOutline />
                                    ) : (
                                        showCreator &&
                                        event.creatorId === id && <Icon20UserOutline />
                                    )
                                }
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

UsersModal.propTypes = {
    payload: pt.object,
    id: pt.string,
};

export default UsersModal;
