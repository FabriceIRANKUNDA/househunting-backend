import express from "express";
import Validator from "../../middlewares/Validator";
import { accountExist } from "../../middlewares/scodeChecker";
import AuthController from "../../controllers/AuthController";
import DataChecker from "../../middlewares/DataChecker";
import verifyToken from "../../middlewares/verifyToken";
import verifyAccess from "../../middlewares/verifyAccess";
import { userExists } from "../../middlewares/scodeChecker";
import { validate } from "uuid";
import validator from "validator";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  Validator.newAccountRules(),
  Validator.validateInput,
  accountExist,
  AuthController.signup
);

authRouter.post(
  "/login",
  Validator.loginRules(),
  Validator.validateInput,
  DataChecker.validateCredentials,
  AuthController.login
);

authRouter.patch(
    "/admin/assign-role",
    verifyToken,
    verifyAccess("admin"),
    Validator.roleRules(),
    Validator.userIdRules(),
    Validator.validateInput,
    userExists,
    AuthController.assignRole
  );
  authRouter.patch(
    "/admin/activate-user",
    verifyToken,
    verifyAccess("admin"),
    Validator.roleRules(),
    Validator.userIdRules(),
    Validator.validateInput,
    userExists,
    AuthController.activateUser
  );
  authRouter.patch(
    "/admin/verify-user",
    verifyToken,
    verifyAccess("admin"),
    Validator.roleRules(),
    Validator.userIdRules(),
    Validator.validateInput,
    userExists,
    AuthController.verifyUser
  );

authRouter.post(
  "/admin/invite",
  verifyToken,
  verifyAccess("admin"),
  Validator.invitationRules(),
  Validator.validateInput,
  accountExist,
  AuthController.inviteUser
);

authRouter.get(
  "/admin/users",
  verifyToken,
  verifyAccess("admin"),
  AuthController.viewUsers
);

authRouter.patch(
    "/user/profile",
    verifyToken,
    AuthController.updateProfile
  );

  authRouter.patch(
    "/user/profile/psw",
    verifyToken,
    Validator.updatePasswordRules,
    AuthController.updateProfile
  );

export default authRouter;
