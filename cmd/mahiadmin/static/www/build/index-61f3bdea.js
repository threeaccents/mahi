var NotificationDuration;
(function (NotificationDuration) {
    NotificationDuration[NotificationDuration["SHORT"] = 3000] = "SHORT";
    NotificationDuration[NotificationDuration["MEDIUM"] = 5000] = "MEDIUM";
    NotificationDuration[NotificationDuration["LONG"] = 7000] = "LONG";
})(NotificationDuration || (NotificationDuration = {}));
function toastr() {
    const getWrapperEl = () => {
        let wrapperEl = document.querySelector('.toastr-wrapper');
        if (wrapperEl)
            return wrapperEl;
        wrapperEl = document.createElement('div');
        wrapperEl.classList.add('toastr-wrapper');
        const body = document.querySelector('body');
        body.appendChild(wrapperEl);
        return wrapperEl;
    };
    const createToastrEl = () => {
        const toastrEl = document.createElement('div');
        toastrEl.classList.add('toastr-element');
        return toastrEl;
    };
    const show = (type, msg, duration) => {
        const el = createToastrEl();
        el.classList.add(type);
        el.innerHTML = msg;
        const wrapperEl = getWrapperEl();
        wrapperEl.appendChild(el);
        setTimeout(() => {
            wrapperEl.removeChild(el);
        }, duration);
    };
    return Object.freeze({
        success(msg, duration = 3000) {
            show('success', msg, duration);
        },
        info(msg, duration = 3000) {
            show('info', msg, duration);
        },
        warning(msg, duration = 3000) {
            show('warning', msg, duration);
        },
        danger(msg, duration = 3000) {
            show('danger', msg, duration);
        }
    });
}

export { toastr as t };
