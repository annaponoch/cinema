import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    movie_id: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    image_URL: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
    collection: 'movies'
  }
);

export const Movie = mongoose.model('Movie', movieSchema);