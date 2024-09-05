import express from 'express';
import { addPlayer, updatePlayerStats, getPlayerDetails, removePlayer } from '../controllers/player.controller';

const router = express.Router();

router.post('/add', addPlayer);
router.put('/update-stats/:id', updatePlayerStats);
router.get('/:id', getPlayerDetails);
router.delete('/remove/:id', removePlayer);

export default router;
