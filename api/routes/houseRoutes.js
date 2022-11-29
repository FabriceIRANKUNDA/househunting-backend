import express from "express";
import houseController from "../controllers/HouseController";
import protectedRoute from "../middlewares/verifyToken";

const router = express.Router();

router.use(protectedRoute);
router
  .route("/")
  .get(houseController.getAllHouses)
  .post(houseController.createHouse);
router
  .route("/:id")
  .get(houseController.getHouse)
  .patch(houseController.updateHouse)
  .delete(houseController.deleteHouse);

export default router;
