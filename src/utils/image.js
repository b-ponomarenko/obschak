const sizes = {
    xs: '/tr:w-300,h-300',
    s: '/tr:w-480,h-480',
    l: '/tr:q-80',
};

export const getImage = (image, size = 'l') => {
    if (!image) {
        return;
    }

    return `${process.env.REACT_APP_IMAGE_SERVER_URL}${sizes[size]}${image}`;
};
