import mongoose from "mongoose";

interface EventDocument extends mongoose.Document {
  name: string;
  type: string;
  description: string;
  dateFrom: Date,
  dateTo: Date,
  location: {
    type: string,
    coordinates: number[]
  },
}

const schema = new mongoose.Schema<EventDocument>({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateFrom: {
    type: Date,
    required: true
  },
  dateTo: {
    type: Date,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
}, {timestamps: true});

schema.index({ location: '2dsphere' });

export const Event = mongoose.model("event", schema);