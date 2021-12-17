import { Router } from 'express'
import * as clientsCtrl from '../controllers/clients.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 



// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)


export {
    router
}