import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    movie_id: {type:Number, required:true},
    session_id: {type:String, required:true},
    user_id: {type:String, required:true},
    user_email: {type:String, required:true},
    booking_date: {type:Date, required:true},
    payment_method: {type:String, required:true},
    payed_uah: { type: Number, required:true},
    booked_seats: [{ type: String, required:true }]
  },
  {
    timestamps: true,
    collection: 'transactions'
  }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);