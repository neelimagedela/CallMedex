const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    // TODO:
    // 1. Check authenticated user
    // 2. Validate allowed role
    // 3. Continue or reject request
  };
};

module.exports = {
  authorize,
};
