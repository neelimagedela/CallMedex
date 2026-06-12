const AppError = require("../../../shared/utils/AppError");

/**
 * Role-based authorization middleware.
 * Must be used AFTER authenticate middleware so req.user is populated.
 *
 * Usage: router.get("/route", authenticate, authorize(["supervisor"]), handler)
 */
const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new AppError("Authentication required", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to access this resource", 403)
      );
    }

    next();
  };
};

module.exports = { authorize };
