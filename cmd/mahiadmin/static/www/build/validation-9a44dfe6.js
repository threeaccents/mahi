const isEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const isFullName = (name) => {
    const re = /^[a-zA-Z\s]*$/;
    const nameArray = name.split(" ");
    return nameArray.length > 1 && re.test(name);
};

export { isEmail as a, isFullName as i };
