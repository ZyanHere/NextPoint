import { Request, Response } from 'express';
import Player from '../models/player.schema';

// Add a new player
export const addPlayer = async (req: Request, res: Response) => {
  try {
    const { name, team } = req.body;
    const newPlayer = new Player({ name, team });
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: 'Error adding player', details: error });
  }
};

// Update player stats
export const updatePlayerStats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    const { runs, balls, fours, sixes, wickets, overs, maidens, runsConceded, catches, stumpings, runOuts } = req.body;

    if (runs) player.runs += runs;
    if (balls) player.balls += balls;
    if (fours) player.fours += fours;
    if (sixes) player.sixes += sixes;
    if (wickets) player.wickets += wickets;
    if (overs) player.overs += overs;
    if (maidens) player.maidens += maidens;
    if (runsConceded) player.runsConceded += runsConceded;
    if (catches) player.catches += catches;
    if (stumpings) player.stumpings += stumpings;
    if (runOuts) player.runOuts += runOuts;

    await player.save();
    res.status(200).json({ message: 'Player stats updated', player });
  } catch (error) {
    res.status(500).json({ error: 'Error updating player stats', details: error });
  }
};

// Get player details by ID
export const getPlayerDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching player details', details: error });
  }
};

// Remove a player
export const removePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.status(200).json({ message: 'Player removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing player', details: error });
  }
};
