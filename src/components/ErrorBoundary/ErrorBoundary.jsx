import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon56FireOutline from '@vkontakte/icons/dist/56/fire_outline';
import { Placeholder, Button } from '@vkontakte/vkui';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends PureComponent {
    state = { hasError: false };

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);

        this.setState({ hasError: true });
    }

    handleReload = () => window.location.reload();

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
                <Placeholder
                    icon={
                        <div className={styles.fire}>
                            <Icon56FireOutline />
                        </div>
                    }
                    header="Что-то пошло не так"
                    action={
                        <Button size="l" onClick={this.handleReload}>
                            Перезагрузить
                        </Button>
                    }
                >
                    Мы уже знаем о проблеме, попробуйте перезагрузить приложение
                </Placeholder>
            );
        }

        return children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node,
};

export default ErrorBoundary;
