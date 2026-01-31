const express =  require("express");
const ratelimiter = require("../middlewares/rateLimiter");
const controller = require("../controllers/vehicle.controller");

const router = express.Router();
router.post("/add", ratelimiter, controller.addVehicle);
router.patch("/assign-driver/:vehickeId", controller.assignDriver);
router.get("/:vehicleId", controller.getVehicle);

module.exports = router;