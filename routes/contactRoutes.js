const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middleware/validateTokenHandle.js");
const {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController.js");

router.use(validateTokenHandler);

router.route("/:id").get(getContact);

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
