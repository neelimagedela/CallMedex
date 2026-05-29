const asyncHandler = require("../../../shared/utils/asyncHandler");
const { successResponse } = require("../../../shared/utils/response");

const {
  getHomeServiceTests,
} = require("../models/homeService.model");

const listHomeServiceTestsController = asyncHandler(async (req, res) => {
  const tests = await getHomeServiceTests();

  return successResponse({
    res,
    status: 200,
    message: "Home service tests retrieved successfully",
    data: tests,
  });
});

module.exports = {
  listHomeServiceTestsController,
};