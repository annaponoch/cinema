import express from 'express';
import { Session } from '../models/sessionModel.js';

const sessionsRoute = express.Router();

sessionsRoute.post('/', async (request, response)=> {
    try {
        if (
            !request.body.movie_id||
            !request.body.date_time||
            !request.body.price          
        ) {
            return response.status(400).send({
                message: 'Not all fields are filled'
            });
        }
        const newSession = {
          movie_id: request.body.movie_id,
          date_time: request.body.date_time,
          price: request.body.price,
          11: '',
          12: '',
          13: '',
          14: '',
          15: '',
          21: '',
          22: '',
          23: '',
          24: '',
          25: '',
          31: '',
          32: '',
          33: '',
          34: '',
          35: '',
          41: '',
          42: '',
          43: '',
          44: '',
          45: '',
          51: '',
          52: '',
          53: '',
          54: '',
          55: ''
                   
        };
        const session = await Session.create(newSession);
        return response.status(201).send(session);
    } catch (error) {
        console.log(error.message);
        response.status().send({message: error.message});
    }
 });

 sessionsRoute.get('/', async (request, response)=> {
    try {
        const session = await Session.find({});
        return response.status(200).json(session);
    } catch (error) {
        console.log(error.message);
        response.status().send({message: error.message});
    }
 });

 sessionsRoute.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const session = await Session.findById(id);
  
      return response.status(200).json(session);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  sessionsRoute.put('/:id', async (request, response) => {
    try {
      // if (
      //   !request.body.title||
      //   !request.body.format||
      //   !request.body.image_URL||
      //   !request.body.description||
      //   !request.body.director  
      // ) {
      //   return response.status(400).send({
      //     message: 'Send all required fields: title, author, publishYear',
      //   });
      // }
  
      const { id } = request.params;
  
      const result = await Session.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Session not found' });
      }
  
      return response.status(200).send({ message: 'Session updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

sessionsRoute.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Session.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Session not found' });
      }
  
      return response.status(200).send({ message: 'Session deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

 export default sessionsRoute;