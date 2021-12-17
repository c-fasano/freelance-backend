import { Router } from 'express'
import * as projectCtrl from '../controllers/projects.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/',checkAuth, projectCtrl.index)
router.post('/', checkAuth, projectCtrl.create)
router.get('/:id', projectCtrl.show)
router.put('/:id', checkAuth, projectCtrl.update)
router.delete('/:id', checkAuth, projectCtrl.delete)


export {
    router
}