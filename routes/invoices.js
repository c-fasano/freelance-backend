import { Router } from 'express'
import * as invoicesCtrl from '../controllers/invoices.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Protected Routes ========= 
//project routes
router.use(decodeUserFromToken)
router.get('/',checkAuth, invoicesCtrl.index)
router.post('/', checkAuth, invoicesCtrl.create)
router.get('/:id', checkAuth, invoicesCtrl.show)
router.put('/:id', checkAuth, invoicesCtrl.update)
router.delete('/:id', checkAuth, invoicesCtrl.delete)




export {
    router
}