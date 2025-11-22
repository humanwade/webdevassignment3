import express from 'express';
import { getInfo, saveInfo } from '../controllers/contactInfo.controller.js';

const router = express.Router();

router.route('/api/contact-info')
  .get(getInfo)
  .post(saveInfo); 

export default router;
