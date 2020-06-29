import React, { useCallback } from 'react';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon56MarketOutline from '@vkontakte/icons/dist/56/market_outline';
import styles from './PurchaseList.module.css';
import { Button, Div, Group, Placeholder, RichCell } from '@vkontakte/vkui';
import Avatar from '../../../../components/Avatar/Avatar';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import { currencies } from '../../../../conts/currencies';
import useCurrentEvent from '../../../../hooks/useCurrentEvent';
import { useDispatch, useSelector } from 'react-redux';
import navigateTo from '../../../../actions/navigateTo';
import isEmpty from '@tinkoff/utils/is/empty';
import DelayedLoader from '../../../../components/DelayedLoader/DelayedLoader';

const PurchaseList = () => {
    const event = useCurrentEvent();
    const user = useSelector(({ user }) => user);
    const dispatch = useDispatch();
    const navigateToCreatePurchase = useCallback(
        () => dispatch(navigateTo('event.create-purchase', { eventId: event.id })),
        []
    );
    const navigateToPurchase = (purchaseId) =>
        dispatch(navigateTo('event.purchase', { eventId: event.id, purchaseId }));

    return (
        <DelayedLoader loading={!event} loader={null}>
            {() => {
                const { purchases, title } = event;

                if (isEmpty(purchases)) {
                    return (
                        <Placeholder
                            icon={<Icon56MarketOutline />}
                            header={<>В событии «{title}» пока нет ни одной покупки</>}
                            action={
                                <Button size="l" onClick={navigateToCreatePurchase}>
                                    Добавить покупку
                                </Button>
                            }
                        >
                            Для того, чтобы добавить покупку нажмите «Добавить покупку»
                        </Placeholder>
                    );
                }

                return (
                    <Group>
                        <Div>
                            <Button
                                before={<Icon24Add />}
                                size="xl"
                                mode="secondary"
                                onClick={navigateToCreatePurchase}
                            >
                                Добавить покупку
                            </Button>
                        </Div>
                        <DelayedLoader>
                            {() =>
                                purchases.map(({ id, name, creatorId, value, currency, date }) => {
                                    const currentUser = user[creatorId];

                                    return (
                                        <RichCell
                                            key={id}
                                            before={
                                                <div className={styles.avatar}>
                                                    <Avatar
                                                        size={48}
                                                        src={currentUser?.photo_100}
                                                    />
                                                </div>
                                            }
                                            text={name}
                                            caption={format(new Date(date), "d MMM' в 'HH:mm", {
                                                locale: ru,
                                            })}
                                            after={`${value.toLocaleString('ru')} ${
                                                currencies[currency]
                                            }`}
                                            onClick={() => navigateToPurchase(id)}
                                        >
                                            {currentUser?.first_name} {currentUser?.last_name}
                                        </RichCell>
                                    );
                                })
                            }
                        </DelayedLoader>
                    </Group>
                );
            }}
        </DelayedLoader>
    );
};

PurchaseList.propTypes = {};

export default PurchaseList;
