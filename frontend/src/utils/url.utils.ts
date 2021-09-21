export function getFirstParamValue() {
  if (!window.location.search) {
    return "";
  }

  return window.location.search.slice(1).split("&")[0].split("=")[1];
}
