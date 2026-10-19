const express = require('express')
const router = express.Router()

const { register, login, getProfile } = require("../controller/authController")
const { auth } = require ("../middlewares/authMiddleware")

//rutas públicas
router.post('/register', register)
router.post('/login', login)

//rutas protegidas - pasan por el middleware de autenticación.
router.get('/profile', auth, getProfile)

module.exports = router