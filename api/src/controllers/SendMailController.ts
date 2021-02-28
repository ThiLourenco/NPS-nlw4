import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) return res.status(400).json({ 
        error: 'User does not exists',
      });
  
    const survey = await surveysRepository.findOne({
      id: survey_id
    });

    if (!survey) return res.status(400).json({
        error: 'Survey does not exists!'
    });

    // mapeando o caminho do template hbs onde será usado as variavél
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    
    // verificando se a pesquisa para usuário já existe 
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      // realizando um select na condição de AND, dessa forma seria a condição de OR[{}, {}]
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey'],
    });
    
    // criando o objeto variavel
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL,
    }

    // se existir será enviado a pesquisa existente
    if (surveyUserAlreadyExists) {
      // se existir o variable.id será sobreescrito o valor
      variables.id = surveyUserAlreadyExists.id
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return res.json(surveyUserAlreadyExists);
    }

    // Salvar as informações na tabela surveyUser
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    });

    await surveysUsersRepository.save(surveyUser);
    // Enviar e-mail para o usuário

    // se não existe receberá o id da criação
    variables.id = surveyUser.id
    
    await SendMailService.execute(email, survey.title, variables, npsPath);

    return res.json(surveyUser);
  }
}
 
export { SendMailController };