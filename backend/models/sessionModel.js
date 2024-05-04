import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema(
  {
    movie_id: {type:Number, required:true},
    date_time: {type:Date, required:true},
    price: {type:Number, required:true},
    seats: [{ type: String }]
  },
  {
    timestamps: true,
    collection: 'sessions'
  }
);

export const Session = mongoose.model('Session', sessionSchema);