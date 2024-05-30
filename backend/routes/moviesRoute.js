import express from 'express';
import { Movie } from '../models/movieModel.js';

const moviesRoute = express.Router();

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:\\Users\\Anna\\универ\\Дипломна робота\\cinema\\website\\public\\images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

moviesRoute.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).send({ imageURL: `/images/${req.file.filename}` });
  } catch (error) {
    res.status(500).send({ message: 'Error uploading image', error: error.message });
  }
});



moviesRoute.post('/', async (request, response) => {
  try {
      if (
          !request.body.title ||
          !request.body.format ||
          !request.body.image_URL ||
          !request.body.description ||
          !request.body.director||
          !request.body.genre||
          !request.body.yt_link 
      ) {
          return response.status(400).send({
              message: 'Not all fields are filled'
          });
      }
      const maxMovieId = await Movie.find().sort({ movie_id: -1 }).limit(1);

      const newMovieId = maxMovieId.length ? maxMovieId[0].movie_id + 1 : 1;

      const newMovie = {
          movie_id: newMovieId,
          title: request.body.title,
          format: request.body.format,
          image_URL: request.body.image_URL,
          description: request.body.description,
          director: request.body.director,
          genre: request.body.genre,
          yt_link: request.body.yt_link
      };

      const movie = await Movie.create(newMovie);
      return response.status(201).send(movie);
  } catch (error) {
      console.log(error.message);
      response.status().send({ message: error.message });
  }
});




 moviesRoute.get('/', async (request, response)=> {
    try {
        const movie = await Movie.find({});
        return response.status(200).json(movie);
    } catch (error) {
        console.log(error.message);
        response.status().send({message: error.message});
    }
 });

 moviesRoute.get('/movie_id/:movieId', async (request, response) => {
  try {
      const { movieId } = request.params;
      const movie = await Movie.findOne({ movie_id: movieId });
      if (!movie) {
          return response.status(404).json({ message: 'Movie not found' });
      }
      return response.status(200).json(movie);
  } catch (error) {
      console.error('Error fetching movie:', error);
      response.status(500).json({ message: 'Error fetching movie' });
  }
});

 moviesRoute.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const movie = await Movie.findById(id);
  
      return response.status(200).json(movie);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  moviesRoute.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title||
        !request.body.format||
        !request.body.image_URL||
        !request.body.description||
        !request.body.director||
        !request.body.genre||
        !request.body.yt_link   
      ) {
        return response.status(400).send({
          message: 'Send all required fields',
        });
      }
  
      const { id } = request.params;
  
      const result = await Movie.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Movie not found' });
      }
  
      return response.status(200).send({ message: 'Movie updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

moviesRoute.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Movie.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Movie not found' });
      }
  
      return response.status(200).send({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

 export default moviesRoute;