import React, { useCallback } from 'react';
import pt from 'prop-types';
import { SimpleCell, Switch } from '@vkontakte/vkui';
import Icon20Info from '@vkontakte/icons/dist/20/info';
import styles from './SimplifyDebtsSettings.module.css';
import { useDispatch } from 'react-redux';
import openModal from '../../actions/openModal';

const SimplifyDebtsSettings = ({ debtType, onChange }) => {
    const dispatch = useDispatch();
    const handleChange = useCallback(
        () => onChange(debtType === 'simple' ? 'detailed' : 'simple'),
        [debtType]
    );
    const handleHintClick = useCallback(() => {
        dispatch(openModal({ name: 'SIMPLIFY_DEBTS_EXPLANATION_CARD' }));
    }, []);

    return (
        <SimpleCell
            disabled
            after={<Switch checked={debtType === 'simple'} onClick={handleChange} />}
        >
            <div className={styles.simplifyDebts}>
                Упростить долги
                <span className={styles.hint} onClick={handleHintClick}>
                    <Icon20Info />
                </span>
            </div>
        </SimpleCell>
    );
};

SimplifyDebtsSettings.propTypes = {
    debtType: pt.oneOf(['simple', 'detailed']),
    onChange: pt.func.isRequired,
};

export default SimplifyDebtsSettings;
