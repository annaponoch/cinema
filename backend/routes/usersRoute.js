import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js';

const usersRoute = express.Router();
const saltRounds = 10;

usersRoute.post('/', async (request, response) => {
  try {
      const { name, email, password } = request.body;
      if (!name || !email || !password) {
          return response.status(400).send({
              message: 'Not all fields are filled'
          });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return response.status(400).send({
              message: 'Email already exists'
          });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = {
          name,
          email,
          password: hashedPassword
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
        const users = await User.find({});
        return response.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
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
      const user = await User.findOne({ email });
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return response.status(401).json({ message: 'Incorrect password' });
      }
      return response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
});

usersRoute.put('/:id', async (request, response) => {
    try {
      const { name, email, password } = request.body;
      if (!name || !email || !password) {
        return response.status(400).send({
          message: 'Send all required fields: name, email, password',
        });
      }

      const { id } = request.params;

      // Хешування нового пароля
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const result = await User.findByIdAndUpdate(id, {
        name,
        email,
        password: hashedPassword
      }, { new: true });

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
