import React, { PureComponent } from 'react';
import pt from 'prop-types';
import { Panel, PanelHeader, PanelHeaderBack, Button, Div } from '@vkontakte/vkui';
import PurchaseForm from '../../components/PurchaseForm/PurchaseForm';
import Icon28DeleteOutline from '@vkontakte/icons/dist/28/delete_outline';

export default class PurchasePure extends PureComponent {
    state = {};

    static propTypes = {
        route: pt.object,
        user: pt.object,
        navigateTo: pt.object,
        purchase: pt.object,
        fetchPurchase: pt.func,
        updatePurchase: pt.func,
        deletePurchase: pt.func,
        openPopout: pt.func,
        closePopout: pt.func,
    };

    componentDidMount() {
        const { fetchPurchase, route, purchase, openPopout, closePopout } = this.props;
        const { purchaseId } = route.params;

        if (!purchase) {
            openPopout({ name: 'SCREEN_SPINNER' });
        }

        return fetchPurchase(purchaseId).finally(closePopout);
    }

    navigateBack = () => {
        const { navigateTo, route } = this.props;
        const { eventId } = route.params;

        navigateTo('event', { eventId });
    };

    handleSubmit = (values) => {
        const { updatePurchase, purchase } = this.props;
        const { name, value, currency, creatorId, users } = values;

        return updatePurchase(purchase.id, {
            name,
            value,
            currency,
            creatorId,
            participants: users,
        }).then(this.navigateBack);
    };

    handleDeleteClick = () => {
        const { openPopout } = this.props;

        openPopout({
            name: 'DELETE_PURCHASE_CONFIRMATION',
            payload: { onDelete: this.handleDelete },
        });
    };

    handleDelete = () => {
        const { deletePurchase, purchase } = this.props;

        return deletePurchase(purchase.id).then(this.navigateBack);
    };

    render() {
        const { purchase } = this.props;

        if (!purchase) {
            return (
                <Panel id="event.purchase">
                    <PanelHeader left={<PanelHeaderBack onClick={this.navigateBack} />}>
                        Покупка
                    </PanelHeader>
                </Panel>
            );
        }

        const { name, value, currency, participants, creatorId } = purchase;

        return (
            <Panel id="event.purchase">
                <PanelHeader left={<PanelHeaderBack onClick={this.navigateBack} />}>
                    Покупка
                </PanelHeader>
                <PurchaseForm
                    creatorId={creatorId}
                    name={name}
                    value={value}
                    currency={currency}
                    users={participants}
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
            </Panel>
        );
    }
}
