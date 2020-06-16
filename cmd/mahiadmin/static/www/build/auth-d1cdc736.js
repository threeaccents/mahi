const me = () => {
    return JSON.parse(localStorage.getItem('me'));
};
const meUserId = () => {
    return localStorage.getItem('userId');
};

export { meUserId as a, me as m };
