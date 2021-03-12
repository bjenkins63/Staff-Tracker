const express = require("express");
const router = express.Router();
const db = require("../../models");

// get all departments
router.get("/all", (req, res) => {
  db.Department.findAll().then(departments => res.send(departments));
});

// get single department by id
router.get("/find/:id", (req, res) => {
  db.Department.findAll({
    where: {
      id: req.params.id
    }
  }).then(department => res.send(department));
});

// post new department
router.post("/new", (req, res) => {
  db.Department.create({
    text: req.body.text
  }).then(() => res.send(department));
});

// delete department
router.delete("/delete/:id", (req, res) => {
  db.Department.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a department
router.put("/edit", (req, res) => {
  db.Department.update(
    {
      text: req.body.text
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});

module.exports = router;