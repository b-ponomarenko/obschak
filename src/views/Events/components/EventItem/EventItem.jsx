import React, { useCallback } from 'react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import { RichCell, UsersStack, Avatar, Title } from '@vkontakte/vkui';
import styles from './EventItem.module.css';
import { useDispatch } from 'react-redux';
import navigateTo from '../../../../actions/navigateTo';
import getColorByText from '../../../../getColorByText';

const EventItem = ({ event }) => {
    const dispatch = useDispatch();
    const { id, title, photo, startDate, endDate, users } = event;
    const navigateToEvent = useCallback(() => dispatch(navigateTo(`events/${id}`)), [id]);

    return (
        <RichCell
            onClick={navigateToEvent}
            before={
                <div className={styles.avatar}>
                    <Avatar size={72} src={photo} style={{ background: getColorByText(title) }} />
                    <div className={styles.placeholder}>
                        {!photo && <Title level="1">{title.charAt(0)}</Title>}
                    </div>
                </div>
            }
            caption={
                <div className={styles.calendar}>
                    <Icon20CalendarOutline />
                    &nbsp;{format(new Date(startDate), 'd MMM hh:mm', { locale: ru })}
                    &nbsp;&mdash;&nbsp;{format(new Date(endDate), 'd MMM hh:mm', { locale: ru })}
                </div>
            }
            bottom={
                <UsersStack photos={users.map(({ avatar }) => avatar)} size="m" visibleCount={3} />
            }
        >
            {title}
        </RichCell>
    );
};

export default EventItem;
