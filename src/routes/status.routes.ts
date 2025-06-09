import express, { Router, Request, Response } from 'express';
import { getEntityStatusByID } from '../controllers/status.Controller';

const router: Router = express.Router();

router.get('/:id', getEntityStatusByID);

export default router;
