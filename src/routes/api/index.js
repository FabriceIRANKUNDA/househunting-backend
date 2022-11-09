import { Router } from "express";
import authRoute from "./AuthRoute";
import questionRoute from "./QuestionRoute";
import testRoute from "./testRoutes";

const router = Router();

router.use("/auth", authRoute);
router.use("/question", questionRoute);
router.use("/test", testRoute);

export default router;
