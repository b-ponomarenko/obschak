import React, { PureComponent } from 'react';
import cx from 'classnames';
import pt from 'prop-types';
import memoize from '@tinkoff/utils/function/memoize/one';
import getDebtList from '../../getDebtList';
import styles from './BalanceList.module.css';
import { Group, RichCell } from '@vkontakte/vkui';
import Avatar from '../../../../components/Avatar/Avatar';
import Icon16Down from '@vkontakte/icons/dist/16/down';
import { currencies } from '../../../../conts/currencies';

const getDebtListCached = memoize(getDebtList);

export default class BalanceList extends PureComponent {
    static propTypes = {
        user: pt.object,
        event: pt.object,
        currentUser: pt.object,
        showBalanceActions: pt.func,
    };

    state = {};

    render() {
        const { event, user, showBalanceActions, currentUser } = this.props;
        const { purchases } = event;
        const debts = getDebtListCached(purchases, currentUser.id);

        return (
            <Group>
                {debts.map(({ from, to, value, currency }) => {
                    const userFrom = user[from];
                    const userTo = user[to];
                    const isCurrentUser = from === currentUser.id || to === currentUser.id;

                    return (
                        <RichCell
                            key={`${from}_${to}`}
                            onClick={() => showBalanceActions({ from, to, value, currency })}
                            before={
                                <div className={styles.avatarContainer}>
                                    <div className={styles.userFrom}>
                                        <Avatar size={44} src={userFrom?.photo_100} />
                                    </div>
                                    <div className={styles.userTo}>
                                        <Avatar size={44} src={userTo?.photo_100} />
                                    </div>
                                </div>
                            }
                            after={
                                <span
                                    className={cx({
                                        [styles.positive]: isCurrentUser && currentUser.id === to,
                                        [styles.negative]: isCurrentUser && currentUser.id === from,
                                    })}
                                >
                                    {value.toLocaleString('ru')} {currencies[currency]}
                                </span>
                            }
                        >
                            <div className={styles.balanceContent}>
                                {userFrom?.first_name}&nbsp;
                                <div className={styles.icon}>
                                    <Icon16Down />
                                </div>
                                &nbsp;{userTo?.first_name}
                            </div>
                        </RichCell>
                    );
                })}
            </Group>
        );
    }
}
