const router = require('express').Router();
const { Employee, Role, Department } = require('../../models');


// GET all departments
router.get('/', async (req, res) => {
  try {
    const departmentData = await Department.findAll();
    res.status(200).json(departmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a department
router.post('/', async (req, res) => {
  try {
    const departmentData = await Department.create(req.body);
    res.status(200).json(departmentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a department
router.delete('/:id', async (req, res) => {
  try {
    const departmentData = await Department.destroy({
      where: { id: req.params.id }
    });
    if (!departmentData) {
      res.status(404).json({ message: 'No department with this id!' });
      return;
    }
    res.status(200).json(departmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
