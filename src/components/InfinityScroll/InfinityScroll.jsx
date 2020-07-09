import React, { PureComponent, Fragment, createRef } from 'react';
import noop from '@tinkoff/utils/function/noop';
import range from '@tinkoff/utils/array/range';
import pt from 'prop-types';
import styles from './InfinityScroll.module.css';

const threshold = range(0, 100, 1).map((val) => val / 100);

export default class InfinityScroll extends PureComponent {
    static propTypes = {
        children: pt.node.isRequired,
        next: pt.func.isRequired,
        loadingComponent: pt.node.isRequired,
        loading: pt.bool,
    };

    static defaultProps = {
        next: noop,
    };

    state = {};

    componentDidMount() {
        this.observer = new IntersectionObserver(this.next, { threshold });
        this.observer.observe(this.children.current);
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    children = createRef();

    next = ([{ boundingClientRect, target }]) => {
        const hiddenDistance = boundingClientRect.bottom - window.innerHeight;

        if (
            hiddenDistance > window.innerHeight ||
            this.props.loading ||
            target.offsetHeight < window.innerHeight * 0.5
        ) {
            return;
        }

        this.props.next();
    };

    render() {
        const { children, loading, loadingComponent } = this.props;

        return (
            <Fragment>
                <div className={styles.root}>
                    {children}
                    <div
                        ref={this.children}
                        className={styles.sentinel}
                        style={{
                            height: `calc(100% - ${window.innerHeight}px)`,
                        }}
                    />
                </div>
                {loading ? loadingComponent : null}
            </Fragment>
        );
    }
}
