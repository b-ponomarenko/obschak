import React, { useCallback, useEffect } from 'react';
import pt from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Panel as BasePanel, Snackbar } from '@vkontakte/vkui';
import closeSnackbar from '../../actions/closeSnackbar';
import styles from './Panel.module.css';
import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
import { setHistory } from '../../reducers/history';
import once from '@tinkoff/utils/function/once';

const icons = {
    error: <Icon28ErrorOutline width={24} height={24} className={styles.errorIcon} />,
    info: (
        <div className={styles.infoIcon}>
            <Icon28DoneOutline width={14} height={14} />
        </div>
    ),
};

const Panel = ({ children, previousView, id, ...props }) => {
    const snackbar = useSelector(({ snackbar }) => snackbar.snackbar);
    const dispatch = useDispatch();
    const handleClose = useCallback(() => dispatch(closeSnackbar()), []);
    const snackbarIcon = icons[snackbar?.type];

    useEffect(() => {
        const cb = once(() => dispatch(setHistory([previousView, id].filter(Boolean))));

        document.addEventListener('VKUI:View:transition-end', cb);

        return () => document.removeEventListener('VKUI:View:transition-end', cb);
    }, [previousView]);

    return (
        <BasePanel id={id} {...props}>
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
    previousView: pt.string,
    id: pt.string,
};

export default Panel;
