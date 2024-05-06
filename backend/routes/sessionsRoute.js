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
        const seatsArray = JSON.stringify([
          ['free', 'free', 'free', 'free', 'free'],
          ['free', 'free', 'free', 'free', 'free'],
          ['free', 'free', 'free', 'free', 'free'],
          ['free', 'free', 'free', 'free', 'free'],
          ['free', 'free', 'free', 'free', 'free']
        ]);
        const newSession = {
          movie_id: request.body.movie_id,
          date_time: request.body.date_time,
          price: request.body.price,
          seats: seatsArray
                   
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

//  sessionsRoute.get('/filter/:movieId/:selectedDate', async (req, res) => {
//   try {
//     const { movieId, selectedDate } = req.params;
//     const sessions = await Session.aggregate([
//       {
//         $match: {
//           movie_id: movieId,
//           date_time: {
//             $gte: new Date(selectedDate),
//             $lt: new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1))
//           }
//         }
//       }
//     ]);
//     res.json(sessions);
//   } catch (error) {
//     console.error('Error fetching sessions:', error);
//     res.status(500).json({ message: 'Error fetching sessions' });
//   }
// });

sessionsRoute.get('/movie/:movieId/:selectedDate', async (req, res) => {
  try {
    const { movieId, selectedDate } = req.params;
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate + 'T23:59:59.999Z');
    const sessions = await Session.find({ 
      movie_id: movieId, 
      date_time: { $gte: startDate, $lt: endDate } 
    });
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
});



sessionsRoute.get('/date/:selectedDate', async (req, res) => {
  try {
    const { selectedDate } = req.params;
    const sessions = await Session.aggregate([
      {
        $match: {
          date_time: { $gte: new Date(selectedDate), $lt: new Date(selectedDate + 'T23:59:59.999Z') }
        }
      }
    ]);
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Error fetching sessions' });
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


  sessionsRoute.put('/seats/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const { seats } = request.body;
  
      // Отримання існуючого запису сеансу
      const session = await Session.findById(id);
  
      if (!session) {
        return response.status(404).json({ message: 'Session not found' });
      }
  
      // Отримання масиву місць з існуючого запису сеансу
      let currentSeats = JSON.parse(session.seats);
  
      // Зміна стану місць за вказаними індексами
      seats.forEach(seat => {
        const { rowIndex, seatIndex } = seat;
        currentSeats[rowIndex][seatIndex] = 'occupied';
      });
  
      // Оновлення запису сеансу з оновленим масивом місць
      await Session.findByIdAndUpdate(id, { seats: JSON.stringify(currentSeats) });
  
      return response.status(200).json({ message: 'Session updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
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