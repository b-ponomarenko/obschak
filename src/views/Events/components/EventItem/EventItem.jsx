import React, { useCallback } from 'react';
import pt from 'prop-types';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import { RichCell, UsersStack } from '@vkontakte/vkui';
import styles from './EventItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import navigateTo from '../../../../actions/navigateTo';
import Avatar from '../../../../components/Avatar/Avatar';

const EventItem = ({ event }) => {
    const dispatch = useDispatch();
    const { id, title, photo, startDate, endDate } = event;
    const navigateToEvent = useCallback(() => dispatch(navigateTo('event', { eventId: id })), [id]);
    const users = useSelector(({ user }) => event.users.map((id) => user[id]));

    return (
        <RichCell
            onClick={navigateToEvent}
            before={
                <div className={styles.avatar}>
                    <Avatar size={72} src={photo} letter={title} />
                </div>
            }
            caption={
                <div className={styles.calendar}>
                    <Icon20CalendarOutline />
                    &nbsp;{format(new Date(startDate), 'd MMM HH:mm', { locale: ru })}
                    &nbsp;&mdash;&nbsp;{format(new Date(endDate), 'd MMM HH:mm', { locale: ru })}
                </div>
            }
            bottom={
                <UsersStack
                    photos={users.map((user) => user?.photo_100)}
                    size="m"
                    visibleCount={3}
                />
            }
        >
            {title}
        </RichCell>
    );
};

EventItem.propTypes = {
    event: pt.shape({
        id: pt.number,
        title: pt.string,
        photo: pt.string,
        startDate: pt.string,
        endDate: pt.string,
        users: pt.array,
    }),
};

export default EventItem;
