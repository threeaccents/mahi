const BASE_URL = () => {
    const hostname = window.location.hostname;
    if (hostname.includes('oriio.local')) {
        return 'http://localhost:4200';
    }
    return 'https://api.oriio.io';
};

const stripeKey = () => {
    return "pk_test_3WdlhfOquwPG51HlQaZzr0ZI00GZTHIflX";
};

export { BASE_URL as B, stripeKey as s };
