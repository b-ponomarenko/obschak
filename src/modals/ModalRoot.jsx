import React from 'react';
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';
import Icon24DismissSubstract from '@vkontakte/icons/dist/24/dismiss_substract';
import { ModalRoot, ModalPage, ModalPageHeader, PanelHeaderButton, Search, Cell, List, Div, Avatar, Caption } from '@vkontakte/vkui';
import styles from './styles.module.css';

export default ({ activeModal }) => (
    <ModalRoot activeModal={activeModal}>
        <ModalPage
            settlingHeight={80}
            id={"friends"}
            header={
                <ModalPageHeader right={<PanelHeaderButton>Готово</PanelHeaderButton>}>
                    Друзья
                </ModalPageHeader>
            }
        >
            <Search />
            <Div>
                <div className={styles.user}>
                    <Avatar size={60}  src="https://placeimg.com/72/72/people"src="https://placeimg.com/72/72/people" />
                    <div className={styles.deleteIcon}>
                        <Icon24DismissDark />
                    </div>
                    <div className={styles.name}>
                        <Caption level="2">foobar</Caption>
                    </div>
                </div>
                <div className={styles.user}>
                    <Avatar size={60}  src="https://placeimg.com/72/72/people"src="https://placeimg.com/72/72/people" />
                    <div className={styles.deleteIcon}>
                        <Icon24DismissSubstract />
                    </div>
                </div>
                <div className={styles.user}>
                    <Avatar size={60}  src="https://placeimg.com/72/72/people"src="https://placeimg.com/72/72/people" />
                    <div className={styles.deleteIcon}>
                        <Icon24DismissDark />
                    </div>
                </div>
            </Div>
            <List>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"src="https://placeimg.com/72/72/people" /> }>Артур Стамбульцян</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"src="https://placeimg.com/72/72/people" /> }>Тимофей Чаптыков</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people" /> }>Влад Анесов</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Артур Стамбульцян</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Тимофей Чаптыков</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people" /> }>Влад Анесов</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Артур Стамбульцян</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Тимофей Чаптыков</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people" /> }>Влад Анесов</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Артур Стамбульцян</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Тимофей Чаптыков</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people" /> }>Влад Анесов</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Артур Стамбульцян</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Тимофей Чаптыков</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people" /> }>Влад Анесов</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Артур Стамбульцян</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Тимофей Чаптыков</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people" /> }>Влад Анесов</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Артур Стамбульцян</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people"/> }>Тимофей Чаптыков</Cell>
                <Cell selectable before={ <Avatar size={40}  src="https://placeimg.com/72/72/people" /> }>Влад Анесов</Cell>
            </List>
        </ModalPage>
    </ModalRoot>
);;
