import mongoose, { Document, Schema } from 'mongoose';

export interface ITable extends Document {
  name: string;
  gameId: string;
  owner: mongoose.Types.ObjectId;
  participants: mongoose.Types.ObjectId[];
  players: {
    name: string;
    score: number;
  }[];
  isActive: boolean;
  metadata?: Record<string, any>;
}

const TableSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gameId: {
      type: String,
      required: true,
      unique: true,
      default: () => Math.random().toString(36).substr(2, 9)
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    players: [{
      name: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        default: 0
      }
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    metadata: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
  }
);

// Create index on gameId for faster lookups
TableSchema.index({ gameId: 1 });

export default mongoose.model<ITable>('Table', TableSchema); 