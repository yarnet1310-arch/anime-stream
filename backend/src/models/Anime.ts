
import mongoose, { Schema, Document } from 'mongoose';

interface IAnime extends Document {
  title: string;
  genre: string;
  description: string;
  videoUrl: string;
  rating: number;
  createdAt: Date;
}

const AnimeSchema: Schema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAnime>('Anime', AnimeSchema);
