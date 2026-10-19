// CONTROLADOR-- contien la lógica (funciones) que se ejecutan en las rutas
// recibe la petición (req) >> usa el model >> se responde

const User = require('../models/UserModel')

// traer todos los usarios - Read- método GET (con ruta home) -/

const getAllUsers = async (req, res) => {
    const todosUsuarios = await User.find()
    res.status(200).json(todosUsuarios)
}
// traer un usuario por id- Read- GET - /:id

const getUserById = async(req, res) => {
    try {
    const { id } = req.params;
    const user = await User.findById(id)
    if (!user) {
            return res.status(404).json({error: "Usuario no encontrado"}) // 404: Not found
        }
    return res.status(200).json(user) // 200: ok
    }

    catch(err) {
        return res.status(400).json({ error: 'ID inválido' }) //400: id no válido
    }
}



// crear usuario - Create - POST - / (ruta home tambien)

const createUser = async (req, res) => {

    try {
        const nuevoUsuario = new User(req.body)
        const usuarioGuardado = await nuevoUsuario.save()
        res.status(201).json(usuarioGuardado) //201: created
    }
    catch (err) {
        res.status(400).json({ error: err.message })// 400: bad request
    }
}

// Actualizar usuario - UPDATE - PUT - /:id

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userModified = await User.findByIdAndUpdate(id,req.body, {new:true, runValidators:true})
        if (!userModified) {
            return res.status(404).json({ error: "Usuario no encontrado" }) // 404: Not found
        }
        return res.status(200).json(userModified) // 200: ok
    }
    catch (err) {
        return res.status(400).json({error: 'id inválido'})
        
    }
}



// eliminar usuario - DELETE- DELETE - /:id

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userdeleted = await User.findByIdAndDelete(id)
        if (!userdeleted) {
            return res.status(404).json({ error: "Usuario no encontrado" }) // 404: Not found
        }
        return res.status(200).json({ message:'usuario eliminado'}) // 200: ok
    }
    catch (err) {
        next(err)
    }
}

module.exports = { getAllUsers, getUserById, createUser,updateUser, deleteUser }
