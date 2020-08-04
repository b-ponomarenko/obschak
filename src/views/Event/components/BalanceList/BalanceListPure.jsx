import React, { PureComponent } from 'react';
import cx from 'classnames';
import pt from 'prop-types';
import UserRelation from '../UserRelation/UserRelation';

export default class BalanceList extends PureComponent {
    static propTypes = {
        user: pt.object,
        event: pt.object,
        currentUser: pt.object,
        showBalanceActions: pt.func,
    };

    state = {};

    render() {
        const { event, showBalanceActions, currentUser } = this.props;
        const { debts } = event;

        return debts.map((debt) => {
            const { from, to } = debt;
            const isCurrentUser = from === currentUser.id || to === currentUser.id;
            const positive = isCurrentUser && currentUser.id === to;
            const negative = isCurrentUser && currentUser.id === from;

            return (
                <UserRelation
                    key={`${from}_${to}`}
                    relation={debt}
                    type={cx({
                        positive,
                        negative,
                    })}
                    onClick={showBalanceActions}
                />
            );
        });
    }
}
