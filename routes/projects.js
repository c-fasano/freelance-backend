import { Router } from 'express'
import * as projectCtrl from '../controllers/projects.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========= Protected Routes ========= 
//project routes
router.use(decodeUserFromToken)
router.get('/',checkAuth, projectCtrl.index)
router.post('/', checkAuth, projectCtrl.create)
router.get('/:id', checkAuth, projectCtrl.show)
router.put('/:id', checkAuth, projectCtrl.update)
router.patch('/:id', checkAuth, projectCtrl.toggleActive)
router.delete('/:id', checkAuth, projectCtrl.delete)

//task for project routes 
router.post('/:id/tasks', checkAuth, projectCtrl.createTask)
router.delete('/:projectId/tasks/:taskId', checkAuth, projectCtrl.deleteTask)
router.patch('/:projectId/tasks/:taskId', checkAuth, projectCtrl.updateTaskStatus)

export {
    router
}