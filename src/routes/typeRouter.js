const Router = require("express");
const typeController = require("../controllers/typeController");
const router = new Router();

router.get("/", typeController.getAll);
router.post("/", typeController.create);

module.exports = router;
