import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  tables: mongoose.Types.ObjectId[];
}

const PlayerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tables: [{
      type: Schema.Types.ObjectId,
      ref: 'Table',
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPlayer>('Player', PlayerSchema); 