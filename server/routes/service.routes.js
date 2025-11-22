import express from 'express';
import serviceCtrl from '../controllers/service.controller.js';

const router = express.Router();

router.route('/api/services')
    .get(serviceCtrl.getAll)
    .post(serviceCtrl.create);

router.route('/api/services/:id')
    .put(serviceCtrl.update)
    .delete(serviceCtrl.remove);

export default router;
