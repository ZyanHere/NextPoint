import express from 'express';
import { addMatch, updateScore, getMatchDetails, updateMatchResult } from '../controllers/match.controller';

const router = express.Router();

router.post('/add', addMatch);
router.put('/update-score/:id', updateScore);
router.get('/:id', getMatchDetails);
router.put('/update-result/:id', updateMatchResult);

export default router;
