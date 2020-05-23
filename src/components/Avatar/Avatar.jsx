import React from 'react';
import pt from 'prop-types';
import styles from './Avatar.module.css';
import { Title, Avatar as BaseAvatar } from '@vkontakte/vkui';

const colors = [
    '#4367A3',
    '#71AAEB',
    '#CCE4FF',
    '#28436E',
    '#384452',
    '#63B9BA',
    '#792EC0',
    '#A393F5',
    '#FFA000',
    '#F05C44',
    '#E6457A',
    '#FAEBEB',
    '#E64646',
    '#FFC107',
    '#E3D3AC',
    '#E3D3AC',
    '#4CD964',
];

export const getColor = (number) => {
    return colors[number % colors.length];
};

const hashFromString = (userName) =>
    userName.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0);

const Avatar = ({ src, letter = '', ...rest }) => (
    <div className={styles.avatar}>
        <BaseAvatar {...rest} src={src} style={{ background: getColor(hashFromString(letter)) }} />
        <div className={styles.placeholder}>
            {!src && <Title level="1">{letter.charAt(0)}</Title>}
        </div>
    </div>
);

Avatar.propTypes = {
    src: pt.string,
    letter: pt.string,
};

export default Avatar;
