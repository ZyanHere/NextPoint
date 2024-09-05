import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  batsmanRuns: { type: Number, required: true },
  extras: {
    wide: { type: Boolean, default: false },
    noBall: { type: Boolean, default: false },
    bye: { type: Boolean, default: false },
    legBye: { type: Boolean, default: false },
    overthrow: { type: Boolean, default: false }
  },
  totalRuns: { type: Number, required: true },
  deliveryNumber: { type: Number, required: true },
  wicket: { type: Boolean, default: false },
  wicketDetails: {
    type: { type: String },
    playerOut: { type: String },
    fielder: { type: String }
  }
});

const MatchSchema = new mongoose.Schema({
  teams: { type: [String], required: true },
  overs: { type: Number, required: true },
  currentOver: { type: Number, default: 0 },
  totalRuns: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  extras: {
    wides: { type: Number, default: 0 },
    noBalls: { type: Number, default: 0 },
    byes: { type: Number, default: 0 },
    legByes: { type: Number, default: 0 }
  },
  battingTeam: { type: String, required: true },
  bowlingTeam: { type: String, required: true },
  striker: { type: String, required: true },
  nonStriker: { type: String, required: true },
  bowler: { type: String, required: true },
  deliveries: { type: [DeliverySchema], required: true },
  matchResult: { type: String, default: '' },
  tossWinner: { type: String, required: true },
  tossDecision: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: Date, required: true }
});

const Match = mongoose.model('Match', MatchSchema);
export default Match;
