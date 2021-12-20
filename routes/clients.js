import { Router } from 'express'
import * as clientCtrl from '../controllers/clients.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Public Routes ========= 



// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/',checkAuth, clientCtrl.index)
router.post('/', checkAuth, clientCtrl.create)
router.get('/:id', checkAuth, clientCtrl.show)
router.put('/:id', checkAuth, clientCtrl.update)
router.delete('/:id', checkAuth, clientCtrl.delete)

// Notes
router.post('/:id/notes', checkAuth, postCtrl.createNote)
router.delete('/:clientId/notes/:noteId', checkAuth, postCtrl.deleteNote)


export {
    router
}