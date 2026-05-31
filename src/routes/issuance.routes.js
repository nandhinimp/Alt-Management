const express = require("express");

const router = express.Router();

const {
  issueBook,
  returnBook,
  getIssuances,
} = require("../controllers/issuance.controller");

router.post("/", issueBook);

router.post("/return", returnBook);

router.get("/", getIssuances);

module.exports = router;