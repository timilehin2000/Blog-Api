import { UserInstance } from "../models/user.model";
import { generateHashedValue } from "../utils/helpers/auth";
import Repository, { IRepository } from "./repository";

export interface IUserRepository<UserInstance>
  extends IRepository<UserInstance> {
  create(data: UserInstance): Promise<any>;
}

class UserRepository extends Repository<UserInstance> {
  create = async (data: UserInstance): Promise<any> => {
    const { firstName, lastName, email, password } = data;

    const user = await this.model.create({
      email,
      firstName,
      lastName,
      password: generateHashedValue(password),
    });
    return user;
  };
}

export default UserRepository;
