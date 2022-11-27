import express from "express";
import authController from "../controllers/AuthController";
import userController from "../controllers/UserController";
import verifyEmail from "../middlewares/verifyToken";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/verifyEmail", verifyEmail, authController.verifyEmail);
router.get("/resendOTP", verifyEmail, authController.resendOTP);
router.post("/login", authController.login);

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
