import React, { useCallback } from 'react';
import pt from 'prop-types';
import { Alert } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closePopout from '../../actions/closePopout';

const NotificationPopout = ({ payload }) => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closePopout()), []);

    const { title, description } = payload;

    return (
        <Alert
            actions={[
                {
                    title: 'Хорошо',
                    autoclose: true,
                    mode: 'cancel',
                },
            ]}
            onClose={handleClose}
        >
            <h2>{title}</h2>
            <p>{description}</p>
        </Alert>
    );
};

NotificationPopout.propTypes = {
    payload: pt.object,
};

export default NotificationPopout;
