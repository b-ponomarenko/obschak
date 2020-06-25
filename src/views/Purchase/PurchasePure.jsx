import React, { PureComponent } from 'react';
import pt from 'prop-types';
import { Panel, PanelHeader, PanelHeaderBack, Button, Div } from '@vkontakte/vkui';
import PurchaseForm from '../../components/PurchaseForm/PurchaseForm';
import Icon28DeleteOutline from '@vkontakte/icons/dist/28/delete_outline';
import DelayedLoader from '../../components/DelayedLoader/DelayedLoader';

export default class PurchasePure extends PureComponent {
    state = {};

    static propTypes = {
        route: pt.object,
        user: pt.object,
        navigateTo: pt.object,
        purchase: pt.object,
        event: pt.object,
        fetchPurchase: pt.func,
        updatePurchase: pt.func,
        deletePurchase: pt.func,
        openPopout: pt.func,
        closePopout: pt.func,
        showSpinner: pt.func,
        hideSpinner: pt.func,
    };

    componentDidMount() {
        const { fetchPurchase, route } = this.props;
        const { purchaseId } = route.params;

        return fetchPurchase(purchaseId);
    }

    navigateBack = () => {
        const { navigateTo, route } = this.props;
        const { eventId } = route.params;

        navigateTo('event', { eventId });
    };

    handleSubmit = (values) => {
        const { updatePurchase, purchase, showSpinner, hideSpinner } = this.props;
        const { name, value, currency, creatorId, users } = values;

        showSpinner();
        return updatePurchase({
            id: purchase.id,
            name,
            value,
            currency,
            creatorId,
            participants: users,
        })
            .then(this.navigateBack)
            .finally(hideSpinner);
    };

    handleDeleteClick = () => {
        const { openPopout } = this.props;

        openPopout({
            name: 'DELETE_PURCHASE_CONFIRMATION',
            payload: { onDelete: this.handleDelete },
        });
    };

    handleDelete = () => {
        const { deletePurchase, purchase, showSpinner, hideSpinner } = this.props;

        showSpinner();
        return deletePurchase(purchase.id).then(this.navigateBack).finally(hideSpinner);
    };

    render() {
        const { purchase, event } = this.props;

        return (
            <Panel id="event.purchase">
                <PanelHeader left={<PanelHeaderBack onClick={this.navigateBack} />}>
                    Покупка
                </PanelHeader>
                <DelayedLoader loading={!purchase}>
                    {() => {
                        const { name, value, currency, participants, creatorId } = purchase;

                        return (
                            <>
                                <PurchaseForm
                                    creatorId={creatorId}
                                    name={name}
                                    value={value}
                                    currency={currency}
                                    users={event.users}
                                    selectedUsers={participants}
                                    submitText="Сохранить"
                                    onSubmit={this.handleSubmit}
                                />
                                <Div>
                                    <Button
                                        size="xl"
                                        mode="destructive"
                                        before={<Icon28DeleteOutline />}
                                        onClick={this.handleDeleteClick}
                                    >
                                        Удалить
                                    </Button>
                                </Div>
                            </>
                        );
                    }}
                </DelayedLoader>
            </Panel>
        );
    }
}
