import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon56FireOutline from '@vkontakte/icons/dist/56/fire_outline';
import { Placeholder, Button, View, Panel } from '@vkontakte/vkui';
import styles from './ErrorBoundary.module.css';
import { connect } from 'react-redux';

class ErrorBoundary extends PureComponent {
    state = { hasError: false };

    static propTypes = {
        vk: PropTypes.object,
        children: PropTypes.node,
    };

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);

        this.setState({ hasError: true });
    }

    handleReload = () => {
        const { vk } = this.props;

        return window.location.reload();
    };

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
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
            );
        }

        return children;
    }
}

export default connect(({ vk }) => ({ vk }))(ErrorBoundary);
