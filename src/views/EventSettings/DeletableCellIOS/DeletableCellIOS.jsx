import React, { createRef, PureComponent } from 'react';
import Icon28MoreHorizontal from '@vkontakte/icons/dist/28/more_horizontal';
import pt from 'prop-types';
import { Cell, Touch } from '@vkontakte/vkui';
import { connect } from 'react-redux';
import openPopout from '../../../actions/openPopout';

const removeSelector = '.Cell__remove-marker';
const noop = () => {};

class DeletableCellIOS extends PureComponent {
    static propTypes = {
        openDeleteUserSheet: pt.func,
        onRemove: pt.func,
    };

    componentDidMount() {
        this.cellRef.current.querySelector(removeSelector).style.display = 'none';
    }

    cellRef = createRef();

    handleEnd = () => {
        this.cellRef.current.querySelector(removeSelector).click();
    };

    handleAsideClick = () => {
        const { openDeleteUserSheet, onRemove } = this.props;

        return openDeleteUserSheet({ onDelete: onRemove });
    };

    render() {
        const { ...rest } = this.props;

        return (
            <Touch onEndX={this.handleEnd} onMoveX={noop}>
                <Cell
                    getRootRef={this.cellRef}
                    removable
                    {...rest}
                    asideContent={
                        <span onClick={this.handleAsideClick}>
                            <Icon28MoreHorizontal />
                        </span>
                    }
                />
            </Touch>
        );
    }
}

const mapContext = (dispatch) => ({
    openDeleteUserSheet: (payload) => dispatch(openPopout({ name: 'DELETE_USER_SHEET', payload })),
});

export default connect(undefined, mapContext)(DeletableCellIOS);
