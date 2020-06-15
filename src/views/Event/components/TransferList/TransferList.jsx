import React, { useCallback } from 'react';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';
import UserRelation from '../UserRelation/UserRelation';
import openPopout from '../../../../actions/openPopout';
import { useDispatch } from 'react-redux';

const TransferList = () => {
    const event = useCurrentEvent();
    const dispatch = useDispatch();
    const handleClick = useCallback(
        ({ id }) => dispatch(openPopout({ name: 'TRANSFER_ACTIONS', payload: { id } })),
        []
    );

    return event.transfers.map((transfer) => (
        <UserRelation key={transfer.id} relation={transfer} onClick={handleClick} />
    ));
};

export default TransferList;
