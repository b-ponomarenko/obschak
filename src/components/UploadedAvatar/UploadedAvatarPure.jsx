import React, { createRef, PureComponent } from 'react';
import pt from 'prop-types';
import Icon28CameraOutline from '@vkontakte/icons/dist/28/camera_outline';
import { Avatar, Spinner } from '@vkontakte/vkui';
import styles from './UploadedAvatarPure.module.css';

export default class UploadedAvatarPure extends PureComponent {
    static propTypes = {
        image: pt.string,
        uploadImage: pt.func,
        openPopout: pt.func,
        onImageChange: pt.func,
    };

    fileRef = createRef();

    state = {};

    handleChangePhoto = () => {
        this.fileRef.current.value = '';
        this.fileRef.current.click();
    };

    handleInputFileChange = (e) => {
        const [image] = e.target.files;
        const { uploadImage, onImageChange } = this.props;

        if (!image) {
            return;
        }

        this.setState({ loading: true });
        uploadImage(image)
            .then(({ image }) => onImageChange(image))
            .finally(() => this.setState({ loading: false }));
    };

    handleOpenPopout = (e) => {
        const { openPopout, onImageChange } = this.props;

        e.stopPropagation();

        openPopout({
            name: 'UPLOADED_AVATAR_ACTIONS',
            payload: { onDelete: () => onImageChange(), onChange: this.handleChangePhoto },
        });
    };

    render() {
        const { image } = this.props;
        const { loading } = this.state;

        return (
            <div className={styles.imagePlaceholder} onClick={this.handleChangePhoto}>
                <input
                    type="file"
                    className={styles.file}
                    ref={this.fileRef}
                    accept="image/*"
                    onChange={this.handleInputFileChange}
                />
                {loading && (
                    <div className={styles.spinner}>
                        <Spinner size="large" />
                    </div>
                )}
                {image ? (
                    <div onClick={this.handleOpenPopout}>
                        <Avatar size={72} src={image} />
                    </div>
                ) : (
                    <Icon28CameraOutline />
                )}
            </div>
        );
    }
}
