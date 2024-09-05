import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import matchRoutes from './routes/match.routes';
import playerRoutes from './routes/player.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
