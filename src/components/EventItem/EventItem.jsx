import React, { FunctionComponent } from 'react';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import { RichCell, UsersStack, Avatar } from '@vkontakte/vkui';
import styles from './EventItem.module.css';

const EventItem = props => (
    <RichCell
        before={<Avatar size={72} />}
        caption={<div className={styles.calendar}><Icon20CalendarOutline />&nbsp;завтра с 09:00</div>}
        bottom={<UsersStack photos={
            [
                'https://placeimg.com/72/72/people',
                'https://placeimg.com/72/72/people',
                'https://placeimg.com/72/72/people',
                'https://placeimg.com/72/72/people',
                'https://placeimg.com/72/72/people',
            ]
        } size="m" visibleCount={3} />}>
        Наименование мероприятияasdadasdasd
    </RichCell>
);

export default EventItem;
