import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {
  // Cria uma pesquisa
  async create(req: Request, res: Response) {
  const { title, description } = req.body;
    
  const surveysRepository = getCustomRepository(SurveysRepository);
    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return res.status(201).json(survey);
  }
  // Mostra a listagem das pesquisas
  async show(req: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const all = await surveysRepository.find();

    return res.json(all);
  }
} 

export { SurveysController };