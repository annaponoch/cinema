import express from 'express';
import { Movie } from '../models/movieModel.js';

const moviesRoute = express.Router();

moviesRoute.post('/', async (request, response)=> {
    try {
        if (
            !request.body.title||
            !request.body.format||
            !request.body.image_URL||
            !request.body.description||
            !request.body.director            
        ) {
            return response.status(400).send({
                message: 'Not all fields are filled'
            });
        }
        const newMovie = {
            title: request.body.title,
            format: request.body.format,
            image_URL: request.body.image_URL,
            description: request.body.description,
            director: request.body.director            
        };
        const movie = await Movie.create(newMovie);
        return response.status(201).send(movie);
    } catch (error) {
        console.log(error.message);
        response.status().send({message: error.message});
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
        !request.body.director  
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
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