import React, { PureComponent } from 'react';
import pt from 'prop-types';

const noop = () => {};

const getValidator = (precision) => {
    let regex;

    if (!precision) {
        regex = '^([0-9])*$';
    } else {
        regex = `^(\\d{1,12})(([.,]\\d{1,${precision}})|[.,])?$`;
    }

    return (value) => {
        return !value.length || new RegExp(regex, 'g').test(value);
    };
};

const getDecimalPartLength = (value) => String(value).split('.')[1]?.length ?? 0;

const toNumber = (value, precision) =>
    Number(Number(String(value).replace(',', '.')).toFixed(precision));

export default (InputComponent) =>
    class NumberInputHOC extends PureComponent {
        static displayName = `numberInputHOC(${InputComponent.name})`;

        static propTypes = {
            value: pt.number,
            precision: pt.number,
            onFocus: pt.func,
            onBlur: pt.func,
            onChange: pt.func.isRequired,
        };

        static defaultProps = {
            precision: 2,
            onFocus: noop,
            onBlur: noop,
        };

        state = {
            value: this.toStringNumber(this.props.value),
        };

        toStringNumber(value) {
            const { precision } = this.props;

            if (typeof value === 'string') {
                return value.replace('.', ',');
            }

            if (value === undefined) {
                return '';
            }

            return value
                .toFixed(Math.min(precision, getDecimalPartLength(value)))
                .replace('.', ',');
        }

        handleBlur = () => {
            const { onBlur, value } = this.props;

            this.setState({ focused: false });
            return onBlur(value);
        };

        handleFocus = () => {
            const { onFocus, value } = this.props;

            this.setState({
                focused: true,
                value: this.toStringNumber(value),
            });
            return onFocus(value);
        };

        handleChange = (e) => {
            const { onChange, precision } = this.props;
            const stringValue = e.target.value;
            const value = toNumber(stringValue, precision);
            const validate = getValidator(this.props.precision);

            console.log(stringValue, typeof stringValue, value, validate(stringValue));

            if (!validate(stringValue)) {
                return;
            }

            this.setState({ value: this.toStringNumber(stringValue) });
            return onChange(stringValue ? value : undefined);
        };

        render() {
            const { value: numberValue, ...props } = this.props;
            const { value, focused } = this.state;

            return (
                <InputComponent
                    {...props}
                    value={focused ? value : numberValue?.toLocaleString('ru-RU')}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onChange={this.handleChange}
                />
            );
        }
    };
