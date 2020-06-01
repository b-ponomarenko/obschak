export default ({ vk, user }) => {
    const { vk_user_id } = vk;

    return user[vk_user_id];
};
