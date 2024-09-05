import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  runs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  strikeRate: {
    type: Number,
    default: function () {
      return this.balls ? (this.runs / this.balls) * 100 : 0;
    }
  },
  wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  maidens: { type: Number, default: 0 },
  runsConceded: { type: Number, default: 0 },
  economy: {
    type: Number,
    default: function () {
      return this.overs ? this.runsConceded / this.overs : 0;
    }
  },
  catches: { type: Number, default: 0 },
  stumpings: { type: Number, default: 0 },
  runOuts: { type: Number, default: 0 }
});

const Player = mongoose.model('Player', PlayerSchema);
export default Player;
