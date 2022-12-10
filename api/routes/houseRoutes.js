import express from "express";
import houseController from "../controllers/HouseController";
import protectedRoute from "../middlewares/verifyToken";

const router = express.Router();

router.use(protectedRoute);
router.get(
  "/preferred-houses",

  houseController.getPreferredHouses
);

router.get("/my-houses", houseController.getMyhouses);
router.get("/:id/booked", houseController.markHouseAsBooked);
router.delete("/delete-houses-permanent", houseController.deleteHousePermanent);

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
