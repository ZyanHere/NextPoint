import { Request, Response } from 'express';
import Match from '../models/match.schema';

// Add a new match
export const addMatch = async (req: Request, res: Response) => {
  try {
    const { teams, overs, tossWinner, tossDecision, venue, date } = req.body;
    const newMatch = new Match({
      teams,
      overs,
      tossWinner,
      tossDecision,
      venue,
      date,
      battingTeam: tossDecision === 'Bat' ? tossWinner : teams.find(t => t !== tossWinner),
      bowlingTeam: tossDecision === 'Bat' ? teams.find(t => t !== tossWinner) : tossWinner,
      striker: '',
      nonStriker: '',
      bowler: ''
    });
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ error: 'Error adding match', details: error });
  }
};

// Update score for a specific match
export const updateScore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { batsmanRuns, extras, wicket, wicketDetails, deliveryNumber } = req.body;
    const match = await Match.findById(id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const totalRuns = batsmanRuns + (extras.wide || extras.noBall || extras.bye || extras.legBye || extras.overthrow ? 1 : 0);
    const newDelivery = { batsmanRuns, extras, totalRuns, deliveryNumber, wicket, wicketDetails };
    match.deliveries.push(newDelivery);

    match.totalRuns += totalRuns;
    if (wicket) match.wickets += 1;
    if (extras.wide) match.extras.wides += 1;
    if (extras.noBall) match.extras.noBalls += 1;
    if (extras.bye) match.extras.byes += totalRuns;
    if (extras.legBye) match.extras.legByes += totalRuns;

    await match.save();
    res.status(200).json({ message: 'Score updated', match });
  } catch (error) {
    res.status(500).json({ error: 'Error updating score', details: error });
  }
};

// Get match details by ID
export const getMatchDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching match details', details: error });
  }
};

// Update match result
export const updateMatchResult = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { result } = req.body;
    const match = await Match.findByIdAndUpdate(id, { matchResult: result }, { new: true });
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.status(200).json({ message: 'Match result updated', match });
  } catch (error) {
    res.status(500).json({ error: 'Error updating match result', details: error });
  }
};
