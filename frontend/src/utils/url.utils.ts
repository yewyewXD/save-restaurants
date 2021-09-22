export function getParsedQueries(): any {
  return window.location.search
    .slice(1)
    .split("&")
    .reduce((acc, string) => {
      const [key, value] = string.split("=");
      return Object.assign(acc, { [key]: value });
    }, {});
}
