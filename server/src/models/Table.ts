import mongoose, { Document, Schema } from 'mongoose';

export interface ITable extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  players: mongoose.Types.ObjectId[];
  metadata?: Record<string, any>;
}

const TableSchema: Schema = new Schema(
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
    players: [{
      type: Schema.Types.ObjectId,
      ref: 'Player',
    }],
    metadata: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITable>('Table', TableSchema); 