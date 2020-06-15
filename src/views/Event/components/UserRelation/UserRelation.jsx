import React, { useCallback } from 'react';
import cx from 'classnames';
import pt from 'prop-types';
import { Avatar, SimpleCell, Card, CardGrid, Separator } from '@vkontakte/vkui';
import styles from './UserRelation.module.css';
import { useSelector } from 'react-redux';
import { ReactComponent as TurnIcon } from './Turn.svg';
import { currencies } from '../../../../conts/currencies';

const UserRelation = ({ relation, type, onClick }) => {
    const user = useSelector(({ user }) => user);
    const { from, to, value, currency } = relation;
    const userFrom = user[from];
    const userTo = user[to];
    const handleClick = useCallback(() => onClick(relation), [relation]);

    return (
        <CardGrid>
            <Card mode="shadow" size="l" onClick={handleClick}>
                <div className={styles.container}>
                    <div className={styles.userContainer}>
                        <SimpleCell
                            before={<Avatar src={userFrom?.photo_100} size={40} />}
                            after={
                                <div className={styles.turnIcon}>
                                    <TurnIcon />
                                </div>
                            }
                            disabled
                        >
                            {userFrom?.first_name} {userFrom?.last_name}
                        </SimpleCell>
                        <SimpleCell disabled before={<Avatar src={userTo?.photo_100} size={40} />}>
                            {userTo?.first_name} {userTo?.last_name}
                        </SimpleCell>
                    </div>
                    <Separator />
                    <div
                        className={cx(styles.money, {
                            [styles.positive]: type === 'positive',
                            [styles.negative]: type === 'negative',
                        })}
                    >
                        {value.toLocaleString('ru')} {currencies[currency]}
                    </div>
                </div>
            </Card>
        </CardGrid>
    );
};

UserRelation.propTypes = {
    relation: pt.shape({
        from: pt.number,
        to: pt.number,
        value: pt.number,
        currency: pt.string,
    }),
    type: pt.string,
    onClick: pt.func,
};

export default UserRelation;
