import React, { PureComponent } from 'react';
import pt from 'prop-types';
import { PanelHeader, PanelHeaderBack, Button, Div } from '@vkontakte/vkui';
import PurchaseForm from '../../components/PurchaseForm/PurchaseForm';
import Icon28DeleteOutline from '@vkontakte/icons/dist/28/delete_outline';
import DelayedLoader from '../../components/DelayedLoader/DelayedLoader';
import Panel from '../../components/Panel/Panel';

export default class PurchasePure extends PureComponent {
    state = {};

    static propTypes = {
        route: pt.object,
        user: pt.object,
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

    handleSubmit = (values) => {
        const { updatePurchase, purchase, showSpinner, hideSpinner } = this.props;
        const { name, value, currency, creatorId, receipts, users } = values;

        showSpinner();
        return updatePurchase({
            id: purchase.id,
            name,
            value,
            currency,
            creatorId,
            receipts,
            participants: users,
        })
            .then(this.handleBackClick)
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
        return deletePurchase(purchase.id).then(this.handleBackClick).finally(hideSpinner);
    };

    handleBackClick = () => window.history.back();

    render() {
        const { purchase, event } = this.props;

        return (
            <Panel id="event.purchase" previousView="event">
                <PanelHeader left={<PanelHeaderBack onClick={this.handleBackClick} />}>
                    Покупка
                </PanelHeader>
                <DelayedLoader loading={!purchase}>
                    {() => {
                        const {
                            name,
                            value,
                            currency,
                            participants,
                            receipts,
                            creatorId,
                        } = purchase;

                        return (
                            <>
                                <PurchaseForm
                                    creatorId={creatorId}
                                    receipts={receipts}
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
