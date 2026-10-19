const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../models/UserModel')
const { createToken } = require('../utils/createToken')



//crear registro nuevo

const register = async (req, res) => {
    try {
        const { nombre, email, edad, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "nombre, email y contraseña son obligatorios" })
        }
        const newUser = await User.findOne({ email })
            
        if (newUser) {
            return res.status(409).json({ error: "el email ya esta registrado" })
        }
        const hashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
        const createUser = await User.create({ nombre, email, edad, password: hashed });
        const token = createToken(createUser._id)
        return res.status(201).json({
            user: {
                id: createUser._id,
                nombre: createUser.nombre,
                email: createUser.email,
                edad: createUser.edad

            }, token
        })
    }
    
    catch (err) {
        return res.status(500).json({error: 'error de servidor'})
    }
    
}


const login = async (req, res) => {
    try {
        //validación de campos de entrada del login
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({error:'Email y password son obligatorios'})
        }
        //buscamos al usuario por su email
        const user = await User.findOne({ email })
        // si no encuentra usuario
        if (!user) {
            return res.status(400).json({error: 'Credenciales inválidas'})
        }
        // comparamos las contraseñas del usuario con las del req.body
        const passwordOk = await bcrypt.compare(password, user.password)
        if (!passwordOk) {
            return res.status(400).json({ error: 'Contraseñas no coinciden o contraseña inválida' })
        }
        //si coinciden contraseñan, creamos el token
        const token = createToken(user._id)
        // responder sin exponer la contraseña
        return res.status(200).json({
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                edad: user.edad

            },token
                
        })

    } catch (err) {
        return res.status(500).json({ error: 'error de servidor' })
    }
}

// get profile

const getProfile = async(req, res) => {
    try {
        //buscamos al usuario por ID
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({error:"Usuario no encontrado"})
        }
        return res.status(200).json(user)

    }
    
    catch (error) {
        return res.status(500).json({ error: 'error de servidor' })
    }
}


module.exports = { register, login, getProfile }
