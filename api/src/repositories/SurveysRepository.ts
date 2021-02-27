import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey) // repositirio de pesquisa
class SurveysRepository extends Repository<Survey> {}

export { SurveysRepository };