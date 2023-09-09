import {
  FindOptions,
  Model,
  BuildOptions,
  UpdateOptions,
  DestroyOptions,
} from "sequelize";

export interface IRepository<T> {
  findAll(filter?: FindOptions<T>): Promise<any>;
  findOne(filter: FindOptions<T>): Promise<any> | null;
  delete(filter: DestroyOptions<T>): Promise<any> | null;
}

export type ModelStatic<DataType> = typeof Model &
  (new (values?: DataType, options?: BuildOptions) => Model);

class Repository<DataType> {
  model: ModelStatic<DataType>;
  constructor(model: ModelStatic<DataType>) {
    this.model = model;
  }

  findAll = async (filter?: FindOptions<DataType>): Promise<any> => {
    const data = await this.model.findAll(filter);
    return data;
  };
  findOne = async (filter: FindOptions<DataType>): Promise<any> => {
    const data = await this.model.findOne(filter);
    return data;
  };
  delete = async (filter?: FindOptions<DataType>): Promise<any> => {
    const data = await this.model.destroy(filter);
    return data;
  };
}

export default Repository;
