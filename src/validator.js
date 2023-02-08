export default {
  verifyOddOptions(options) {
    if (options.length % 2 === 0 || options.length < 3) {
      console.error(
        "Invalid moves: please pass odd number of options (3 or more)."
      );
      return false;
    }
    return true;
  },

  verifyDistinctOptions(options) {
    if (new Set(options).size !== options.length) {
      console.error("Invalid options: all moves must be distinct.");
      return false;
    }
    return true;
  },
};
