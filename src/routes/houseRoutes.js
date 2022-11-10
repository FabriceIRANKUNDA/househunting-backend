import express from "express";
import houseController from "../controllers/HouseController";

const router = express.Router();

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
