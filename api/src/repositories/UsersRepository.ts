import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User) // herdado Repository do repository do typeorm
class UsersRepository extends Repository<User> {}

export { UsersRepository };