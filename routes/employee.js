const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')

router.get('/', EmployeeController.getAllEmp)
router.get('/:id', EmployeeController.getSingleEmp)
router.post('/create', EmployeeController.createEmp)
router.put('/update/:id', EmployeeController.updateEmp)
router.delete('/delete/:id', EmployeeController.deleteEmp)

module.exports = router