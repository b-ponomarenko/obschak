import React, { createRef, PureComponent } from 'react';
import styles from './HorizontalScroll.module.css';
import pathOr from '@tinkoff/utils/object/pathOr';
import pt from 'prop-types';

export default class HorizontalScroll extends PureComponent {
    static propTypes = {
        children: pt.node,
    };

    state = {
        left: 0,
    };

    containerRef = createRef();
    contentRef = createRef();

    componentWillUnmount() {
        document.removeEventListener('touchmove', this.handleMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
    }

    componentDidUpdate() {
        const { left } = this.state;
        const scrollWidth = pathOr(['scrollWidth'], 0, this.containerRef.current);
        const offsetWidth = pathOr(['offsetWidth'], 0, this.containerRef.current);
        const sign = offsetWidth > scrollWidth ? 1 : -1;
        const max = Math.abs(offsetWidth - scrollWidth);

        if (sign * left > max) {
            this.setState({ left: sign * max });
        }
    }

    handleTouchStart = (e) => {
        this.last = e.touches[0].clientX;
        document.addEventListener('touchmove', this.handleMove);
        document.addEventListener('touchend', this.handleTouchEnd);
    };

    handleTouchEnd = () => {
        document.removeEventListener('touchmove', this.handleMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
    };

    handleMove = (e) => {
        if (e.type === 'touchemove') {
            e.preventDefault();
        }

        const clientX = e.touches[0].clientX;

        if (clientX === this.last) {
            return;
        }

        requestAnimationFrame(() => {
            const offsetWidth = pathOr(['offsetWidth'], 0, this.containerRef.current);
            const scrollWidth = pathOr(['scrollWidth'], 0, this.containerRef.current);
            let left = this.state.left + (clientX - this.last);
            const sign = offsetWidth > scrollWidth ? 1 : -1;
            const min = 0;
            const max = Math.abs(offsetWidth - scrollWidth);

            if (sign * left < min) {
                left = min;
            }

            if (sign * left > max) {
                left = sign * max;
            }

            this.setState({ left });
            this.last = clientX;
        });
    };

    render() {
        const { children } = this.props;
        const { left } = this.state;

        return (
            <div ref={this.containerRef}>
                <div
                    ref={this.contentRef}
                    style={{ transform: `translateX(${left}px)` }}
                    onTouchStart={this.handleTouchStart}
                    onTouchEnd={this.handleTouchEnd}
                    className={styles.container}
                >
                    {children}
                </div>
            </div>
        );
    }
}
