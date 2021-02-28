import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/appError';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    // validação dos campos
    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      email: yup.string().email().required('E-mail é Obrigatório'),
    });

    // se não for válido
    try {
      await schema.validate(req.body, { abortEarly: false});
    } catch(err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    // select * from users where email = "email" é subtituido pelo find one
    const userAlreadyExists = await usersRepository.findOne({
    email
  });
    
    if(userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
   }
}

export { UserController };
