import './validation-9a44dfe6.js';
import './auth-d1cdc736.js';

const randInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

// could maybe clean this up
// name the functions within the filter and map to better understand what we're checking
const generateParams = (obj) => {
    if (!obj)
        return '';
    // generate the query params
    let queryParam = Object.keys(obj)
        .filter(key => obj[key] && obj[key] !== '')
        .map(key => key + '=' + obj[key])
        .join('&');
    // adds a `&` if queryParam is not empty
    queryParam = queryParam && queryParam !== '' ? `${queryParam}&` : queryParam;
    //  Removes a trailing `&` if its left over
    queryParam = queryParam[queryParam.length - 1] == '&' ? queryParam.substring(0, queryParam.length - 1) : queryParam;
    return '?' + queryParam;
};

const byteToGB = (num) => {
    const result = num / 1000000000;
    return roundFloat(result);
};
const roundFloat = (num) => {
    return Math.round(num * 100) / 100;
};
const limitLen = (str, length) => {
    return str.length <= length ? str : `${str.substr(0, (length - 3))}...`;
};
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const debounce = (func, wait) => {
    var timeout;
    return function () {
        const args = arguments;
        const later = () => {
            timeout = null;
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const copyToClipboard = (text) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

export { byteToGB as b, copyToClipboard as c, debounce as d, formatBytes as f, generateParams as g, limitLen as l, randInt as r };
