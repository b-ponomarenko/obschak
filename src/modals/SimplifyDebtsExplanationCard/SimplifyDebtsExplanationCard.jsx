import React, { useCallback } from 'react';
import { ModalCard } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import closeModal from '../../actions/closeModal';
import styles from './SimplifyDebtsExplanationCard.module.css';
import before from './before.PNG';

const SimplifyDebtsExplanationCard = () => {
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeModal()), []);

    return (
        <ModalCard
            onClose={handleClose}
            id="SIMPLIFY_DEBTS_EXPLANATION_CARD"
            header="Уменьшение количества долгов"
            caption="«Общак» сгруппирует долги и избавит Вас от лишних платежей"
        >
            <div className={styles.imgContainer}>
                <img src={before} className={styles.image} />
                <div className={styles.imgContainerBefore} />
                <div className={styles.imgContainerAfter} />
            </div>
        </ModalCard>
    );
};

export default SimplifyDebtsExplanationCard;
