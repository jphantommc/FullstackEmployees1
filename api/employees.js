import express from "express";
const router = express.Router();
export default router;

import {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
} from "../db/queries/employees.js";

router.route("/").get(async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
})
.post(async (req, res) => {
    if (!req.body) return res.status(400).send(" Request body is required");

    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
        return res.status(400).send("Name, birthday, and salary are required");
    }

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
});

router.route("/:id").get(async (req, res) => {
    const { id } = req.params;
    const employee = await getEmployee(id);
    if (!employee) return res.status(404).send("Employee not found");
    res.send(employee);
    next();
})

router.route("/:id").get((req, res) => {
    res.send(req.employee);
})

.delete(async (req, res) => {
    await deleteEmployee(req.employee.id);
    res.status(204).send();
})

.put(async (req, res) => {
    if(!req.body) return res.status(400).send("Request body is required");
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
        return res.status(400).send("Name, birthday, and salary are required");
    }

    const emplotee = await updateEmployee({
        id: req.employee.id,
        name,
        birthday,
        salary,
});
    res.send(employee);
});