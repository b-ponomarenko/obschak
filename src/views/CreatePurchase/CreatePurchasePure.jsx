import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Icon28WriteSquareOutline from '@vkontakte/icons/dist/28/write_square_outline';
import {
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderButton,
    FormLayout,
    FormLayoutGroup,
    Input,
    Title,
    Group,
    Header,
    Cell,
    Avatar,
    Div,
    Button,
} from '@vkontakte/vkui';
import numberInputHOC from '../../components/numberInputHOC';
import equal from '@tinkoff/utils/is/equal';
import styles from './CreatePurchasePure.module.css';

const NumberInput = numberInputHOC(Input);

const isArrayEqual = (a, b) => equal([...a].sort(), [...b].sort());

export default class CreatePurchasePure extends PureComponent {
    static propTypes = {
        route: pt.object,
        navigateTo: pt.func,
        openNotificationPopout: pt.func,
        fetchEvent: pt.func,
        createPurchase: pt.func,
        event: pt.object,
        user: pt.object,
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

    handleCreatePurchase = () => {
        const { openNotificationPopout, createPurchase, route } = this.props;
        const { value, name, selectedParticipants, currency } = this.state;
        const { eventId } = route.params;
        let isValid = true;

        if (!name) {
            isValid = false;
            this.setState({ nameError: true });
        }

        if (!value) {
            isValid = false;
            this.setState({ valueError: true });
        }

        if (selectedParticipants.length === 0) {
            isValid = false;
            openNotificationPopout({
                title: 'Ни одного участника не выбрано',
                description:
                    'Для продолжения Вам необходимо выбрать хотя бы одного участника покупки',
            });
        }

        if (!isValid) {
            return;
        }

        return createPurchase(eventId, {
            name,
            value,
            currency,
            participants: selectedParticipants,
        }).then(this.navigateBack);
    };

    handleValueChange = (value) => this.setState({ value, valueError: false });
    handleNameChange = (e) => this.setState({ name: e.target.value, nameError: false });

    toggleSelectAllUsers = () => {
        const { users } = this.props.event;
        const { selectedParticipants } = this.state;

        this.setState({
            selectedParticipants: isArrayEqual(users, selectedParticipants) ? [] : [...users],
        });
    };

    handleSelectUser = (userId) => {
        const { selectedParticipants } = this.state;

        if (selectedParticipants.includes(userId)) {
            return this.setState({
                selectedParticipants: selectedParticipants.filter((id) => id !== userId),
            });
        }

        return this.setState({ selectedParticipants: [...selectedParticipants, userId] });
    };

    render() {
        const { value, selectedParticipants, name, valueError, nameError } = this.state;
        const { event, user } = this.props;
        const { users } = event;

        return (
            <Panel id="event.create-purchase">
                <PanelHeader left={<PanelHeaderBack onClick={this.navigateBack} />}>
                    Новая покупка
                </PanelHeader>
                <Group>
                    <FormLayout>
                        <FormLayoutGroup top="Название покупки">
                            <Input
                                placeholder="Введите название покупки"
                                value={name}
                                onChange={this.handleNameChange}
                                status={nameError ? 'error' : undefined}
                            />
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Стоимость">
                            <div className={styles.value}>
                                <NumberInput
                                    placeholder="Введите стоимость"
                                    precision={2}
                                    value={value}
                                    onChange={this.handleValueChange}
                                    status={valueError ? 'error' : undefined}
                                />
                                <div className={styles.currency}>
                                    <Title level="2" weight="regular">
                                        ₽
                                    </Title>
                                </div>
                            </div>
                        </FormLayoutGroup>
                    </FormLayout>
                </Group>
                <Group header={<Header mode="secondary">Участники</Header>}>
                    <Cell
                        selectable
                        checked={isArrayEqual(selectedParticipants, users)}
                        onClick={this.toggleSelectAllUsers}
                    >
                        Все
                    </Cell>
                    {users.map((userId) => {
                        const currentUser = user[userId];

                        return (
                            <Cell
                                key={userId}
                                selectable
                                checked={selectedParticipants.includes(userId)}
                                before={<Avatar size={40} src={currentUser?.photo_100} />}
                                onClick={() => this.handleSelectUser(userId)}
                            >
                                {currentUser?.first_name} {currentUser?.last_name}
                            </Cell>
                        );
                    })}
                </Group>
                <Div>
                    <Button size="xl" onClick={this.handleCreatePurchase}>
                        Добавить покупку
                    </Button>
                </Div>
            </Panel>
        );
    }
}
