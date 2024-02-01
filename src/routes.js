const { Router } = require("express");
const controller = require('./controller');

const router = Router();

router.get("/", controller.getContacts);
router.post("/", controller.addContacts);
router.get("/:id", controller.getContactsById);
router.put("/:id", controller.updateContacts);
router.delete("/:id", controller.removeContacts);

module.exports = router;