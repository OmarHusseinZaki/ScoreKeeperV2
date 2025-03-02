import mongoose, { Document, Schema } from 'mongoose';

export interface IScore extends Document {
  player: mongoose.Types.ObjectId;
  table: mongoose.Types.ObjectId;
  value: number;
  date: Date;
}

const ScoreSchema: Schema = new Schema(
  {
    player: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    table: {
      type: Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IScore>('Score', ScoreSchema); 