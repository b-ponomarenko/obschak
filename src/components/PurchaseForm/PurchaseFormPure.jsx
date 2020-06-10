import React, { PureComponent } from 'react';
import pt from 'prop-types';
import {
    Avatar,
    Button,
    Cell,
    Div,
    FormLayout,
    FormLayoutGroup,
    Group,
    Header,
    Input,
    SelectMimicry,
    Title,
} from '@vkontakte/vkui';
import numberInputHOC from '../numberInputHOC';
import equal from '@tinkoff/utils/is/equal';
import styles from './PurchaseForm.module.css';

const NumberInput = numberInputHOC(Input);
const isArrayEqual = (a, b) => equal([...a].sort(), [...b].sort());

export default class PurchaseFormPure extends PureComponent {
    static propTypes = {
        user: pt.object,
        users: pt.array,
        selectedUsers: pt.array,
        name: pt.string,
        submitText: pt.string,
        value: pt.number,
        creatorId: pt.number,
        onSubmit: pt.func,
        openNotificationPopout: pt.func,
        openModal: pt.func,
    };

    state = {
        creatorId: this.props.creatorId,
        selectedUsers: [...this.props.selectedUsers],
        name: this.props.name,
        value: this.props.value,
        currency: 'RUB',
    };

    static defaultProps = {
        selectedUsers: [],
    };

    handleValueChange = (value) => this.setState({ value, valueError: false });
    handleNameChange = (e) => this.setState({ name: e.target.value, nameError: false });

    toggleSelectAllUsers = () => {
        const { users } = this.props;
        const { selectedUsers } = this.state;

        this.setState({
            selectedUsers: isArrayEqual(users, selectedUsers) ? [] : [...users],
        });
    };

    handleSelectUser = (userId) => {
        const { selectedUsers } = this.state;

        if (selectedUsers.includes(userId)) {
            return this.setState({
                selectedUsers: selectedUsers.filter((id) => id !== userId),
            });
        }

        return this.setState({ selectedUsers: [...selectedUsers, userId] });
    };

    handleOpenMemberModal = () => {
        const { openModal, users } = this.props;
        const { creatorId } = this.state;

        openModal({
            name: 'USERS_MODAL',
            payload: {
                users,
                title: 'Выберите покупателя',
                selectable: true,
                value: creatorId,
                onClose: this.handleSelectCreator,
            },
        });
    };

    handleSelectCreator = (creatorId) => this.setState({ creatorId });

    handleSubmit = () => {
        const { openNotificationPopout, onSubmit } = this.props;
        const { value, name, selectedUsers, currency, creatorId } = this.state;
        let isValid = true;

        if (!name) {
            isValid = false;
            this.setState({ nameError: true });
        }

        if (!value) {
            isValid = false;
            this.setState({ valueError: true });
        }

        if (selectedUsers.length === 0) {
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

        return onSubmit({
            name,
            value,
            currency,
            creatorId,
            users: selectedUsers,
        });
    };

    render() {
        const { user, submitText, users } = this.props;
        const { nameError, valueError, name, value, selectedUsers, creatorId } = this.state;
        const purchaseCreator = user[creatorId];

        return (
            <>
                <Group>
                    <FormLayout>
                        <FormLayoutGroup top="Кто купил">
                            <SelectMimicry multiline onClick={this.handleOpenMemberModal}>
                                <div className={styles.creator}>
                                    <div className={styles.creatorAvatar}>
                                        <Avatar src={purchaseCreator?.photo_100} size={28} />
                                    </div>
                                    <div className={styles.creatorName}>
                                        {purchaseCreator?.first_name} {purchaseCreator?.last_name}
                                    </div>
                                </div>
                            </SelectMimicry>
                        </FormLayoutGroup>
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
                        checked={isArrayEqual(selectedUsers, users)}
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
                                checked={selectedUsers.includes(userId)}
                                before={<Avatar size={40} src={currentUser?.photo_100} />}
                                onClick={() => this.handleSelectUser(userId)}
                            >
                                {currentUser?.first_name} {currentUser?.last_name}
                            </Cell>
                        );
                    })}
                </Group>
                <Div>
                    <Button size="xl" onClick={this.handleSubmit}>
                        {submitText}
                    </Button>
                </Div>
            </>
        );
    }
}
