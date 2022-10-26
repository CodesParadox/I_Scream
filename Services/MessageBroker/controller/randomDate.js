module.exports = (start = new Date(2000, 0, 1), end = new Date()) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
