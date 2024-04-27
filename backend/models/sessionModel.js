import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema(
  {
    movie_id: {type:String, required:true},
    date_time: {type:Date, required:true},
    price: {type:Number, required:true},
    11 :{type:String, required:false},
    12 :{type:String, required:false},
    13 :{type:String, required:false},
    14 :{type:String, required:false},
    15 :{type:String, required:false},
    21 :{type:String, required:false},
    22 :{type:String, required:false},
    23 :{type:String, required:false},
    24 :{type:String, required:false},
    25 :{type:String, required:false},
    31 :{type:String, required:false},
    32 :{type:String, required:false},
    33 :{type:String, required:false},
    34 :{type:String, required:false},
    35 :{type:String, required:false},
    41 :{type:String, required:false},
    42 :{type:String, required:false},
    43 :{type:String, required:false},
    44 :{type:String, required:false},
    45 :{type:String, required:false},
    51 :{type:String, required:false},
    52 :{type:String, required:false},
    53 :{type:String, required:false},
    54 :{type:String, required:false},
    55 :{type:String, required:false}
  },
  {
    timestamps: true,
    collection: 'sessions'
  }
);

export const Session = mongoose.model('Session', sessionSchema);