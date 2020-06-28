import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon56FireOutline from '@vkontakte/icons/dist/56/fire_outline';
import { Placeholder, Button, View, Panel } from '@vkontakte/vkui';
import styles from './ErrorBoundary.module.css';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends PureComponent {
    state = { hasError: false };

    static propTypes = {
        children: PropTypes.node,
    };

    handleReload = () => {
        return window.location.reload();
    };

    render() {
        const { children } = this.props;

        return (
            <Sentry.ErrorBoundary
                fallback={() => (
                    <View activePanel="error">
                        <Panel id="error">
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
                        </Panel>
                    </View>
                )}
            >
                {children}
            </Sentry.ErrorBoundary>
        );
    }
}

export default ErrorBoundary;
