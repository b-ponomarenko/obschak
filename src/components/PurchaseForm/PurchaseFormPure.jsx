import React, { createRef, PureComponent } from 'react';
import cx from 'classnames';
import pt from 'prop-types';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import Icon24DismissDark from '@vkontakte/icons/dist/24/dismiss_dark';
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
    HorizontalScroll,
    Spinner,
} from '@vkontakte/vkui';
import numberInputHOC from '../numberInputHOC';
import equal from '@tinkoff/utils/is/equal';
import isEmpty from '@tinkoff/utils/is/empty';
import styles from './PurchaseForm.module.css';
import { getImage } from '../../utils/image';

const NumberInput = numberInputHOC(Input);
const isArrayEqual = (a, b) => equal([...a].sort(), [...b].sort());

export default class PurchaseFormPure extends PureComponent {
    static propTypes = {
        user: pt.object,
        users: pt.array,
        selectedUsers: pt.array,
        receipts: pt.array,
        name: pt.string,
        submitText: pt.string,
        value: pt.number,
        creatorId: pt.number,
        onSubmit: pt.func,
        openNotificationPopout: pt.func,
        openSnackbar: pt.func,
        uploadImage: pt.func,
        showFullImages: pt.func,
        openModal: pt.func,
    };

    state = {
        creatorId: this.props.creatorId,
        selectedUsers: [...this.props.selectedUsers],
        name: this.props.name,
        value: this.props.value,
        receipts: this.props.receipts,
        currency: 'RUB',
    };

    static defaultProps = {
        selectedUsers: [],
        receipts: [],
    };

    fileRef = createRef();

    handleValueChange = (value) => {
        if (value >= 1000000000) {
            return;
        }

        this.setState({ value, valueError: false });
    };
    handleNameChange = (e) =>
        this.setState({ name: e.target.value.slice(0, 30), nameError: false });

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
        const { value, name, selectedUsers, currency, creatorId, receipts } = this.state;
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
            receipts,
            users: selectedUsers,
        });
    };

    handlePhotoClick = () => {
        this.fileRef.current.value = '';
        this.fileRef.current.click();
    };

    handleInputFileChange = (e) => {
        const { receipts } = this.state;
        const { uploadImage, openSnackbar } = this.props;
        const { files } = e.target;

        if ([...files].some(({ type }) => !/image\/.*$/g.test(type))) {
            return openSnackbar({
                type: 'error',
                children: 'Все загружаемые файлы должны быть изображениями',
            });
        }

        this.setState({ loading: true });
        return Promise.all([...files].map((file) => uploadImage(file)))
            .then((images) =>
                this.setState({
                    receipts: [...images.map(({ image }) => image).reverse(), ...receipts],
                })
            )
            .finally(() => this.setState({ loading: false }));
    };

    handleDeleteReceipt = (e, receipt) => {
        e.stopPropagation();
        this.setState({ receipts: this.state.receipts.filter((r) => r !== receipt) });
    };

    handleImageClick = (index) => {
        const { receipts } = this.state;
        const { showFullImages } = this.props;

        showFullImages({ images: receipts.map((receipt) => getImage(receipt)), index });
    };

    render() {
        const { user, submitText, users } = this.props;
        const {
            nameError,
            valueError,
            name,
            value,
            selectedUsers,
            creatorId,
            receipts,
            loading,
        } = this.state;
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
                <Group header={<Header mode="secondary">Чеки</Header>}>
                    <Div className={styles.div}>
                        <div className={styles.baseContainer}>
                            <div className={cx(styles.image, styles.imageContainer)}>
                                <div onClick={this.handlePhotoClick}>
                                    <Avatar mode="image" size={80}>
                                        {loading ? (
                                            <Spinner size="large" />
                                        ) : (
                                            <Icon28CameraOutline width={40} height={40} />
                                        )}
                                        <input
                                            type="file"
                                            multiple
                                            className={styles.file}
                                            ref={this.fileRef}
                                            accept="image/*"
                                            onChange={this.handleInputFileChange}
                                        />
                                    </Avatar>
                                </div>
                            </div>
                            {!isEmpty(receipts) && (
                                <HorizontalScroll>
                                    <div className={styles.imageContainer}>
                                        {receipts.map((receipt, i) => (
                                            <div
                                                className={styles.image}
                                                key={receipt}
                                                onClick={() => this.handleImageClick(i)}
                                            >
                                                <Avatar
                                                    mode="image"
                                                    size={80}
                                                    src={getImage(receipt, 's')}
                                                />
                                                <div
                                                    className={styles.deleteIcon}
                                                    onClick={(e) =>
                                                        this.handleDeleteReceipt(e, receipt)
                                                    }
                                                >
                                                    <Icon24DismissDark />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </HorizontalScroll>
                            )}
                        </div>
                    </Div>
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
