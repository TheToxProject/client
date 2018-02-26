/**
 * Given an UNIX timestamp, returns a date (yyyy-mm-dd)
 *
 * @param {Number} timestamp - An UNIX timestamp in s.
 * @return {Object} Returns an object of the parsed Date.
 */
export const unixToDate = timestamp => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return { year, month, day, hours, minutes, seconds };
};
