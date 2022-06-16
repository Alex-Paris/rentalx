import Specification from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification | undefined>;
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
}

export { ICreateSpecificationDTO, ISpecificationRepository };
