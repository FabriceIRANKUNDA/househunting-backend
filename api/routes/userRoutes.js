import express from "express";
import authController from "../controllers/AuthController";
import userController from "../controllers/UserController";
import verifyEmail from "../middlewares/verifyToken";
import protectedRoute from "../middlewares/verifyToken";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.use(protectedRoute);
router.post("/verifyEmail", authController.verifyEmail);
router.get("/resendOTP", authController.resendOTP);

router
  .route("/preferences")
  .post(userController.createPreferences)
  .patch(userController.updatePreferences);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
