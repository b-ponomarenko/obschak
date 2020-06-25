import React, { useEffect, useState } from 'react';
import styles from './DelayedLoader.module.css';
import { ScreenSpinner } from '@vkontakte/vkui';

const DelayedLoader = ({ loading, loader, children }) => {
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (loading) {
                setShowLoader(true);
            }
        }, 500);
    }, []);

    return loading ? showLoader && loader : children();
};

DelayedLoader.defaultProps = {
    loader: (
        <div className={styles.loader}>
            <ScreenSpinner />
        </div>
    ),
};

DelayedLoader.propTypes = {};

export default DelayedLoader;
