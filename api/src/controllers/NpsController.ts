import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {
  async execute(req: Request, res: Response) {
    // recebe o id da pesquisa para visualizar o nps
    const { survey_id } = req.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    // retorna todas as resposta referente a pesquisa e que o valor não seja null
    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    // retornando os valores de cada, usando o filter para pesquisar cada item do array
    const detractor = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;
    
    // calculo do nps retornando a porcentagem
    const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));
    
    // retornar os valores como json
    return res.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate
    });
  }
}

export { NpsController };
