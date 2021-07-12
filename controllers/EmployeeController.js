const Employee = require('../models/Employee')
const mongoose = require('mongoose');

// Show the list of Employees
const getAllEmp = (req, res, next) => {
    Employee.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })

        })
}

// Show single Employee
const getSingleEmp = (req, res, next) => {
    let employeeID = req.params.id;
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.status(404).send(
                {
                    "statusCode": 404,
                    "error": "Not Found",
                    "message": "Employee not found!"
                }
            )
        })
}

// Create an Employee
const createEmp = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    employee.save()
        .then(response => {
            res.status(201).send(response)
        })
        .catch(error => {
            console.log('Employee creation error', error);
            if (error.code === 11000) {
                res.status(409).send(
                    {
                        message: 'This email already exists'
                    }
                )
            }
            else {
                res.status(500).send(
                    {
                        message: 'An error occured!'
                    }
                )
            }

        })
}

// Update an Employee
const updateEmp = (req, res, next) => {
    let employeeID = req.params.id;

    let updateData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    try {
        new mongoose.Types.ObjectId(employeeID)
    }
    catch (E) {
        console.log("EEEEEEE", E);
        return res.status(500).send(
            {
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": E.message
            }
        )
        
    }
    Employee.updateOne({ _id: new mongoose.Types.ObjectId(employeeID) }, updateData)
        .then((result) => {
            // console.log(result);
            if (result.n === 1) {
                res.json({
                    message: 'Employee Updated Successfully!'
                })

            }

            else {
                res.status(404).send(
                    {
                        "statusCode": 404,
                        "error": "Not Found",
                        "message": "Employee not found!"
                    }
                )

            }
        })
        .catch(error => {
            res.status(500).send(
                {
                    "statusCode": 500,
                    "error": "Internal Server Error",
                    "message": error.message
                }
            )

        })
}

// Delete an Employee
const deleteEmp = (req, res, next) => {
    let employeeID = req.params.id;
    Employee.findByIdAndRemove(employeeID)
        .then(() => {
            res.json({
                message: 'Employee deleted successfully!'
            })
        })
        .catch(error => {
            res.status(404).send(
                {
                    "statusCode": 404,
                    "error": "Not Found",
                    "message": "Employee not found!"
                }
            )
        })
}

module.exports = {
    getAllEmp, getSingleEmp, createEmp, updateEmp, deleteEmp
}

