import React, { useCallback, useState } from 'react';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
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

const UsersModal = ({ id, payload }) => {
    const { title, users, onClose, selectable, value } = payload;
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(selectable ? value : undefined);
    const user = useSelector(({ user }) => user);
    const handleClose = useCallback(() => {
        onClose(selectable ? selected : undefined);
        dispatch(closeModal());
    }, [selected]);

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
                                after={selectable && id === selected && <Icon28DoneOutline />}
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
