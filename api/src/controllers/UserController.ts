import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User'

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;
    // const body = req.body;
    // console.log(body);
    // return res.send();
    const usersRepository = getRepository(User);

    // select * from users where email = "email" é subtituido pelo find one
    const userAlreadyExists = await usersRepository.findOne({
    email
  });
    
    if(userAlreadyExists) {
      return res.status(400).json({
        error: "User already exists!",
      });
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return res.json(user);
   }
}

export { UserController };