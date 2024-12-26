const express = require("express");
const router = express.Router();

const { getAllGmach, getGmachList } = require("../controllers/getGmachList");
const { getOption } = require("../controllers/getOption");
const { getComments } = require("../controllers/getComments");
const { postComments } = require("../controllers/postComments");
const { signup } = require("../controllers/signup");
const { login } = require("../controllers/login");
const { authenticateToken } = require("../controllers/authenticateToken");
const { DeleteGmach } = require("../controllers/DeleteGmach");

router.get("/all-gmach", getAllGmach);
router.get("/categories-and-city-option", getOption);
router.get("/getGmachList", getGmachList);
router.get("/comments", getComments);
router.post("/comments",authenticateToken, postComments);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/DeleteGmach", authenticateToken, DeleteGmach);

module.exports = router;
