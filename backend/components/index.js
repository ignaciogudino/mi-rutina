import { Router } from 'express'
import User from './controllers/UserController.js'
import { validateToken } from '../config/auth.js'

const router = Router()

export default function userRoutes(app) {
    app.use('/api', router)

    router.post('/login', User.login)

    router.get('/getUserByID/:id', validateToken, User.getUserByID)

    router.get('/getRutinas', validateToken, User.getRutinas)

    router.post('/createUser', validateToken, User.createUser)

    router.get('/getAllUsers', validateToken, User.getAllUsers)

    router.delete('/deleteUser/:id', validateToken, User.deleteUser)

    router.put('/changePassword', validateToken, User.changePassword)
    
    router.put('/membership/:id', validateToken, User.membership)

    router.get('/getAlumnos', validateToken, User.getAlumnos)
    
    router.post('/createRutina/:idAlumno', validateToken, User.createRutina)
}
