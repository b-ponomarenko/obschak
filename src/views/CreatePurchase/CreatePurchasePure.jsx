import React, { PureComponent } from 'react';
import pt from 'prop-types';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import PurchaseForm from '../../components/PurchaseForm/PurchaseForm';

export default class CreatePurchasePure extends PureComponent {
    static propTypes = {
        route: pt.object,
        currentUser: pt.object,
        navigateTo: pt.func,
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

    navigateBack = () => {
        const { route, navigateTo } = this.props;
        const { eventId } = route.params;

        navigateTo('event', { eventId });
    };

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
            .then(this.navigateBack)
            .finally(hideSpinner);
    };

    render() {
        const { event, currentUser } = this.props;
        const { users } = event;

        return (
            <Panel id="event.create-purchase">
                <PanelHeader left={<PanelHeaderBack onClick={this.navigateBack} />}>
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
