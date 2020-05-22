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
