//RUTA-- define la URL (endpoint) y el método HTTP(GET, POST, PATCH, PUT, DELETE) y ejecuta un controlador en cada ruta
//CRUD-- create, read, update, delete

const express = require('express')
const router = express.Router()

// para el read

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controller/userController')
router.get('/', getAllUsers)
router.get('/:id', getUserById)

// para create:
router.post('/', createUser)

//para update
router.put('/:id', updateUser)
// para delete

router.delete('/:id', deleteUser)

module.exports = router;