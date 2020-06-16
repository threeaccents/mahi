export const debounce = (func: Function, wait: number) => {
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
