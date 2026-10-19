//cargar variables de entorno
require('dotenv').config()
//importar dependencias
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// importamos los modelos
//const User = require('./models/UserModel') ya no lo vamos a necesitar


//crear app de express
const app = express()

//cors
app.use(cors())

//middleware para leer JSON cuando hagamos una petición 
app.use(express.json())

//conexión a mongoDB con Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Estás conectado a la BBDD'))
    .catch(err => console.error('Error al conectar la BBDD', err))
    
//ruta básica de prueba o ruta home
/*app.get('/', async (req, res) => {
    const todosUsuarios = await User.find()
    res.status(200).json(todosUsuarios)
} */


// cambiamos la llamada de get así:primero llamamos al router que hemos creado. Rutas de User

const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes) //definimos el endpoint de nuestra api

// Rutas de Auth

const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

//Manejo de rutas no encontradas

app.use((req, res) => {
    res.status(404).json ({error:'Ruta no encontrada'})
}) 

//Middleware de errores
const errors = require('./middlewares/errors')
app.use(errors)



// ruta para crear un usuario (CRUD --> create)
/*app.post('/createuser', async (req, res) => {
   
    try {
        //crear una instancia del modelo con los datos del body de la petición
        const nuevoUsuario = new User(req.body)
        //guardar en la base de datos el nuevo usuario
        const usuarioGuardado = await nuevoUsuario.save()
        //responder con el doc. guardado (manejamos la response)
        res.status(201).json(usuarioGuardado)
    }
    catch (err) {
        //manejo de ls errores de la petición
        res.status(400).json({ error: err.message })
        
    }
 })*/

//arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`servidor escuchando en http://localhost:${PORT}`))
