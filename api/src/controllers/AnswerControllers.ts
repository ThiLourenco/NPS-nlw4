import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

  async execute(req: Request, res: Response) {
    // recebendo os parametros da url
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // buscando a pesquisa do user pelo id
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    // se não existir retornar erro
    if (!surveyUser) {
      return res.status(400).json({
        error: 'Survey User does not exists!'
      });
    }
    // se existe, recebe o valor como num
    surveyUser.value = Number(value);
  
    await surveysUsersRepository.save(surveyUser);
    
    return res.json(surveyUser);
  }
}

export { AnswerController };
