import { Router } from 'express'
import * as projectCtrl from '../controllers/projects.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/',checkAuth, projectCtrl.index)
router.post('/', checkAuth, projectCtrl.create)


export {
    router
}