import express from 'express';
import { User } from '../models/userModel.js';

const usersRoute = express.Router();

usersRoute.post('/', async (request, response) => {
  try {
      if (
          !request.body.name ||
          !request.body.email ||
          !request.body.password
      ) {
          return response.status(400).send({
              message: 'Not all fields are filled'
          });
      }

      // Перевірка наявності користувача з такою ж поштою
      const existingUser = await User.findOne({ email: request.body.email });
      if (existingUser) {
          return response.status(400).send({
              message: 'Email already exists'
          });
      }

      // Створення нового користувача
      const newUser = {
          name: request.body.name,
          email: request.body.email,
          password: request.body.password
      };
      const user = await User.create(newUser);
      return response.status(201).send(user);
  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: 'Internal Server Error' });
  }
});

 usersRoute.get('/', async (request, response)=> {
    try {
        const user = await User.find({});
        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status().send({message: error.message});
    }
 });

 usersRoute.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const user = await User.findById(id);
  
      return response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  usersRoute.post('/login', async (request, response) => {
    try {
      const { email, password } = request.body;
  
      // Знаходимо користувача за його електронною поштою
      const user = await User.findOne({ email });
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      // Перевіряємо, чи співпадає пароль користувача з переданим паролем
      const isPasswordMatch = password === user.password;
  
      if (!isPasswordMatch) {
        return response.status(401).json({ message: 'Incorrect password' });
      }
  
      // Якщо користувача знайдено і пароль співпадає, повертаємо його дані
      return response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });



  usersRoute.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.name||
        !request.body.email||
        !request.body.password    
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await User.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

usersRoute.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await User.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

 export default usersRoute;