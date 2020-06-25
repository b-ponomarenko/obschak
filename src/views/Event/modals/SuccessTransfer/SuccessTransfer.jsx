import React, { useCallback } from 'react';
import pt from 'prop-types';
import Icon56MoneyTransferOutline from '@vkontakte/icons/dist/56/money_transfer_outline';
import { ModalCard } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closeModal from '../../../../actions/closeModal';

const SuccessTransfer = ({ payload }) => {
    const dispatch = useDispatch();
    const { user } = payload;
    const handleClose = useCallback(() => dispatch(closeModal()), []);

    return (
        <ModalCard
            icon={<Icon56MoneyTransferOutline />}
            id="SUCCESS_TRANSFER"
            onClose={handleClose}
            header="Перевод успешно выполнен"
            caption={`${user.first_name} ${user.last_name} получит уведомление о переводе если включены уведомления`}
        />
    );
};

SuccessTransfer.propTypes = {
    payload: pt.object,
};

export default SuccessTransfer;
