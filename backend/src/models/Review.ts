import mongoose, { Schema, Document } from 'mongoose';

interface IReview extends Document {
  user: string;
  animeId: string;
  animeTitle: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  user: { type: String, required: true },
  animeId: { type: String, required: true },
  animeTitle: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', ReviewSchema);
