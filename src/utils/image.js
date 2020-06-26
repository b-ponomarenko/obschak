const sizes = {
    xs: '/tr:w-72,h-72',
    s: '/tr:w-80,h-80',
    l: '/tr:q-80',
};

export const getImage = (image, size = 'l') => {
    if (!image) {
        return;
    }

    return `${process.env.REACT_APP_IMAGE_SERVER_URL}${sizes[size]}${image}`;
};
