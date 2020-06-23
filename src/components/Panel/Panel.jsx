import React, { useCallback } from 'react';
import pt from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Panel as BasePanel, Snackbar } from '@vkontakte/vkui';
import closeSnackbar from '../../actions/closeSnackbar';
import styles from './Panel.module.css';
import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';

const icons = {
    error: <Icon28ErrorOutline width={24} height={24} className={styles.errorIcon} />,
};

const Panel = ({ children, ...props }) => {
    const snackbar = useSelector(({ snackbar }) => snackbar.snackbar);
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeSnackbar()), []);
    const snackbarIcon = icons[snackbar?.type];

    return (
        <BasePanel {...props}>
            {children}

            {snackbar && (
                <Snackbar before={snackbarIcon} onClose={handleClose}>
                    {snackbar.children}
                </Snackbar>
            )}
        </BasePanel>
    );
};

Panel.propTypes = {
    children: pt.node,
};

export default Panel;
