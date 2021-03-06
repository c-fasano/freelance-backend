import { Router } from 'express'
import * as clientCtrl from '../controllers/clients.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/',checkAuth, clientCtrl.index)
router.post('/', checkAuth, clientCtrl.create)
router.get('/:id', checkAuth, clientCtrl.show)
router.put('/:id', checkAuth, clientCtrl.update)
router.delete('/:id', checkAuth, clientCtrl.delete)

// Notes
router.post('/:id/notes', checkAuth, clientCtrl.createNote)
router.delete('/:clientId/notes/:noteId', checkAuth, clientCtrl.deleteNote)


export {
    router
}