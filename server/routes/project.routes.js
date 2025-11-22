import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/projects')
  .get(projectCtrl.getAll)
  .post(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.add)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.deleteAll)

router.route('/api/projects/:id')
  .get(projectCtrl.getById)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, projectCtrl.deleteById)

export default router
