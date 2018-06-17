import * as actions from '../controllers/ObjectController';
import { Router } from 'express';
const router = Router();

router.get('/', actions.all);
router.get('/:key', actions.get);
router.put('/:key', actions.set);
router.delete('/:key', actions.deleteOne);
router.delete('/flush/all', actions.deleteAll);

export default router;
