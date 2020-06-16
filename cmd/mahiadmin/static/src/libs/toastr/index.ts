export enum NotificationDuration {
  SHORT = 3000,
  MEDIUM = 5000,
  LONG = 7000,
}

export default function toastr() {
  const getWrapperEl = () => {
    let wrapperEl = document.querySelector('.toastr-wrapper');
    if (wrapperEl) return wrapperEl;

    wrapperEl = document.createElement('div');
    wrapperEl.classList.add('toastr-wrapper');
    const body = document.querySelector('body');
    body.appendChild(wrapperEl);

    return wrapperEl;
  }

  const createToastrEl = () => {
    const toastrEl = document.createElement('div');
    toastrEl.classList.add('toastr-element');
    return toastrEl;
  }

  const show = (type: string, msg: string, duration) => {
    const el = createToastrEl();
    el.classList.add(type);
    el.innerHTML = msg;

    const wrapperEl = getWrapperEl()
    wrapperEl.appendChild(el);

    setTimeout(() => {
      wrapperEl.removeChild(el);
    }, duration)
  }

  return Object.freeze({
    success(msg: string, duration: NotificationDuration = 3000) {
      show('success', msg, duration)
    },
    info(msg: string, duration: NotificationDuration = 3000) {
      show('info', msg, duration);
    },
    warning(msg: string, duration: NotificationDuration = 3000) {
      show('warning', msg, duration);
    },
    danger(msg: string, duration: NotificationDuration = 3000) {
      show('danger', msg, duration)
    }
  })
}

