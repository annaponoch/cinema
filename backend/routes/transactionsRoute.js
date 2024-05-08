import express from 'express';
import { Transaction } from '../models/transactionModel.js';

const transactionsRoute = express.Router();

transactionsRoute.post('/', async (request, response)=> {
    try {
        if (
          !request.body.movie_id||
          !request.body.session_id||
          !request.body.user_id||
          !request.body.user_email||
          !request.body.booking_date||
          !request.body.payment_method||
          !request.body.payed_uah||
          !request.body.booked_seats
                
        ) {
            return response.status(400).send({
                message: 'Not all fields are filled'
            });
        }
        const newTransaction = {
          movie_id: request.body.movie_id,
          session_id: request.body.session_id,
          user_id: request.body.user_id,
          user_email: request.body.user_email,
          booking_date: request.body.booking_date,
          payment_method: request.body.payment_method,
          payed_uah: request.body.payed_uah,
          booked_seats: request.body.booked_seats
          
        };
        const transaction = await Transaction.create(newTransaction);
        return response.status(201).send(transaction);
    } catch (error) {
        console.log(error.message);
        response.status().send({message: error.message});
    }
 });

 transactionsRoute.get('/', async (request, response)=> {
    try {
        const transaction = await Transaction.find({});
        return response.status(200).json(transaction);
    } catch (error) {
        console.log(error.message);
        response.status().send({message: error.message});
    }
 });

 transactionsRoute.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params;
    const transaction = await Transaction.find({ 
      user_id: userId
    });
    res.json(transaction);
  } catch (error) {
    console.error('Transactions not found', error);
    res.status(500).json({ message: 'Transactions not found' });
  }
});


transactionsRoute.get('/date/:selectedDate', async (req, res) => {
  try {
    const { selectedDate } = req.params;
    const transactions = await Transaction.aggregate([
      {
        $match: {
          booking_date: { $gte: new Date(selectedDate), $lt: new Date(selectedDate + 'T23:59:59.999Z') }
        }
      }
    ]);
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});


 transactionsRoute.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const transaction = await Transaction.findById(id);
  
      return response.status(200).json(transaction);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  transactionsRoute.put('/:id', async (request, response) => {
    try {
  
      const { id } = request.params;
  
      const result = await Transaction.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Transaction not found' });
      }
  
      return response.status(200).send({ message: 'Transaction updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

transactionsRoute.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Transaction.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Transaction not found' });
      }
  
      return response.status(200).send({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

 export default transactionsRoute;