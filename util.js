function getRandomNumber(min = 100000, max = 999999) {
  const mmin = Math.ceil(min);
  const mmax = Math.floor(max);
  return Math.floor(Math.random() * (mmax - mmin + 1)) + mmin;
}
module.exports = {
  getRandomNumber,
};
