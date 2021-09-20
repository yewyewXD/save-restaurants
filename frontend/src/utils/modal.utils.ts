export function debounce(callback:Function, delay = 250) {
  let timeoutId:any;
  return (...args:any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  };
}
