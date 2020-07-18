import React, { useCallback, useState } from 'react';
import Icon56Users3Outline from '@vkontakte/icons/dist/56/users_3_outline';
import pt from 'prop-types';
import { ModalCard, Textarea } from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import { bridge } from '../../core/bridge';
import closeModal from '../../actions/closeModal';

const ShareOfferCard = ({ payload }) => {
    const [message, setMessage] = useState(
        'Рекомендую попробовать организовывать совместные встречи с друзьями с помощью приложения «Общак».\nЗабудьте про расчеты на бумаге или калькуляторе, приложение возьмет это заботу на себя'
    );
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeModal()), []);
    const handleShare = useCallback(() => {
        handleClose();
        bridge.send('VKWebAppShowWallPostBox', {
            message,
            attachments: 'https://vk.com/app7473655',
        });
    }, [message]);

    return (
        <ModalCard
            onClose={handleClose}
            icon={<Icon56Users3Outline />}
            id="SHARE_OFFER_CARD"
            header="Расскажите друзьям о Ваших впечатлениях"
            caption={`Мы заметили, что недавно завершилось событие «${payload.title}». Если Вам понравилось приложение, поделитесь впечатлениями с друзьями`}
            actions={[
                {
                    title: 'Поделиться',
                    mode: 'primary',
                    action: handleShare,
                },
            ]}
        >
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </ModalCard>
    );
};

ShareOfferCard.propTypes = {
    payload: pt.object,
};

export default ShareOfferCard;
