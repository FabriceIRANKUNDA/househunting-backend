import express from "express";
import verifyAccess from "../../middlewares/verifyAccess";
import verifyToken from "../../middlewares/verifyToken";
import TestController from "../../controllers/TestController";
import DataChecker from "../../middlewares/DataChecker";

const router = express.Router();

router.get(
  "/my-tests",
  DataChecker.isPhoneProvided,
  TestController.getAllMyTests
);
// Create Random Test Questions
router.post(
  "/register-test",
  //verifyToken,
  //verifyAccess("student"),
  TestController.createTestQuestions
);

router.post(
  "/practice-test",
  //verifyToken,
  //verifyAccess("student"),
  DataChecker.istestCodeProvided,
  TestController.getUnAtemptedTest
);

router.post(
  "/submit-test",
  //verifyToken,
  //verifyAccess("student"),
  DataChecker.istestCodeProvided,
  TestController.updateTestWithScore
);
router.post(
  "/",
  //verifyToken,
  //verifyAccess("student"),
  DataChecker.istestCodeProvided,
  TestController.getAttemptedTest
);
export default router;
