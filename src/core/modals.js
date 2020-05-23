import React, { Component } from 'react';
import pt from 'prop-types';

const shouldComponentWrapper = (WrappedComponent) =>
    class ShouldComponentWrapper extends Component {
        static displayName = `shouldComponentWrapper(${Component.displayName || Component.name})`;

        static propTypes = {
            currentModal: pt.string,
        };

        shouldComponentUpdate({ currentModal }) {
            return currentModal;
        }

        render() {
            const { currentModal, ...props } = this.props;

            return <WrappedComponent {...props} />;
        }
    };

const modals = [];

export const registerModal = (name, component) =>
    modals.push({ name, component: shouldComponentWrapper(component) });

export const getModals = () => modals;
