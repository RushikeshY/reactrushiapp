/** return duration in milliseconds
 * @param {String} x
 */
exports.parseDuration = (x) => {
  let num = parseInt(x.slice(0, x.length - 1));
  let mod = x.charAt(x.length - 1);
  if (mod === "s") return num * 1000;
  if (mod === "m") return num * 60 * 1000;
  if (mod === "h") return num * 60 * 60 * 1000;
  if (mod === "d") return num * 24 * 60 * 60 * 1000;
  return null;
};