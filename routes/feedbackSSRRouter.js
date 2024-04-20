// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/feedbackSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with feedbacks using EJS
router.get("/", blogSSR.renderFeedbacks);
// End2: Define a route to render the addfeedback.ejs view
router.get("/addfeedback", blogSSR.renderForm);
// End3:Route to add  feedback using EJ
router.post("/addfeedback", blogSSR.addFeedback);
// Define a route to render the singlefeedback.ejs view
router.get("/single-feedback/:id", blogSSR.renderFeedback);
// Define a route to delete singlefeedback
router.delete("/single-feedback/:id", blogSSR.deleteFeedback);
// Define a route to update single feedback.ejs
router.put("/single-feedback/:id", blogSSR.updateFeedback);
// Define feedback to update
router.get("/single-feedback/update/:id", blogSSR.renderUpdateFeedback);

module.exports = router;