const express = require("express");
const controller = require("../controllers/trip.controller");
const { Route } = require("express");
const router=express.Router();
router.post("/create", controller.createTrip);
router.patch("/end/:tripId", controller.endTrip);

module.exports = router;