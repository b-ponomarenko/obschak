import React, { PureComponent } from 'react';
import pt from 'prop-types';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import PurchaseForm from '../../components/PurchaseForm/PurchaseForm';
import Panel from '../../components/Panel/Panel';

export default class CreatePurchasePure extends PureComponent {
    static propTypes = {
        route: pt.object,
        currentUser: pt.object,
        fetchEvent: pt.func,
        createPurchase: pt.func,
        event: pt.object,
        showSpinner: pt.func,
        hideSpinner: pt.func,
    };

    state = {
        currency: 'RUB',
        selectedParticipants: [...this.props.event.users],
    };

    componentDidMount() {
        const { route, fetchEvent } = this.props;
        const { eventId } = route.params;

        fetchEvent(eventId);
    }

    handleSubmit = (purchase) => {
        const { createPurchase, route, showSpinner, hideSpinner } = this.props;
        const { eventId } = route.params;
        const { name, value, currency, creatorId, receipts, users } = purchase;

        showSpinner();
        return createPurchase(eventId, {
            creatorId,
            name,
            value,
            currency,
            receipts,
            participants: users,
        })
            .then(this.handleBackClick)
            .finally(hideSpinner);
    };

    handleBackClick = () => window.history.back();

    render() {
        const { event, currentUser } = this.props;
        const { users } = event;

        return (
            <Panel id="event.create-purchase" previousView="event">
                <PanelHeader left={<PanelHeaderBack onClick={this.handleBackClick} />}>
                    Новая покупка
                </PanelHeader>
                <PurchaseForm
                    creatorId={currentUser.id}
                    users={users}
                    selectedUsers={users}
                    onSubmit={this.handleSubmit}
                    submitText="Добавить покупку"
                />
            </Panel>
        );
    }
}
